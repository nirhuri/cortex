import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Document } from '@docs/documents/db/entities/document.entity';
import { DocumentEvent } from '@docs/documents/db/entities/document-event.entity';
import { CreateDocumentDto } from '@docs/documents/dto/create-document.dto';
import { UpdateDocumentDto } from '@docs/documents/dto/update-document.dto';
import { SnapshotService } from './snapshot.service';
import { DocumentQueryService } from './document-query.service';

@Injectable()
export class DocumentCommandService {
    constructor(
        private readonly dataSource: DataSource,

        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,

        @InjectRepository(DocumentEvent)
        private readonly documentEventRepository: Repository<DocumentEvent>,

        @Inject(SnapshotService)
        private readonly snapshotService: SnapshotService,

        @Inject(DocumentQueryService)
        private readonly queryService: DocumentQueryService,
    ) { }

    async createDocument(dto: CreateDocumentDto): Promise<Document> {
        return this.dataSource.transaction(async (manager) => {
            const docRepo = manager.getRepository(Document);
            const eventRepo = manager.getRepository(DocumentEvent);

            const doc = docRepo.create({
                title: dto.title,
                ownerId: dto.ownerId,
                teamId: dto.teamId,
                isDeleted: false,
            });

            const saved = await docRepo.save(doc);

            const event = eventRepo.create({
                documentId: saved.id,
                version: 1,
                type: 'created',
                payload: {
                    title: saved.title,
                    actorId: saved.ownerId,
                    teamId: saved.teamId,
                },
            });

            await eventRepo.save(event);

            return saved;
        });
    }

    async updateDocument(id: string, dto: UpdateDocumentDto): Promise<Document> {
        return this.dataSource.transaction(async (manager) => {
            const docRepo = manager.getRepository(Document);
            const eventRepo = manager.getRepository(DocumentEvent);

            const doc = await docRepo.findOneBy({ id });
            if (!doc) throw new Error(`Document ${id} not found`);

            Object.assign(doc, dto);
            const saved = await docRepo.save(doc);

            const latestEvent = await eventRepo.findOne({
                where: { documentId: id },
                order: { version: 'DESC' },
            });

            const version = (latestEvent?.version ?? 0) + 1;

            const event = eventRepo.create({
                documentId: id,
                version,
                type: 'updated',
                payload: dto,
            });

            await eventRepo.save(event);

            if (version % 50 === 0) {
                const state = await this.queryService.rebuildDocument(id);
                await this.snapshotService.createSnapshot(id, version, state);
            }

            return saved;
        });
    }

    async deleteDocument(id: string): Promise<void> {
        return this.dataSource.transaction(async (manager) => {
            const docRepo = manager.getRepository(Document);
            const eventRepo = manager.getRepository(DocumentEvent);

            const doc = await docRepo.findOneBy({ id });
            if (!doc) throw new Error(`Document ${id} not found`);

            doc.isDeleted = true;
            await docRepo.save(doc);

            const latestEvent = await eventRepo.findOne({
                where: { documentId: id },
                order: { version: 'DESC' },
            });

            const version = (latestEvent?.version ?? 0) + 1;

            const event = eventRepo.create({
                documentId: id,
                version,
                type: 'deleted',
                payload: null,
            });

            await eventRepo.save(event);

            if (version % 50 === 0) {
                const state = await this.queryService.rebuildDocument(id);
                await this.snapshotService.createSnapshot(id, version, state);
            }
        });
    }

    async saveYjsUpdate(documentId: string, updateBuffer: Uint8Array, actorId: string): Promise<void> {
        const doc = await this.documentRepository.findOneBy({ id: documentId });
        if (!doc || doc.isDeleted) throw new Error(`Document ${documentId} not found`);

        const lastEvent = await this.documentEventRepository.findOne({
            where: { documentId },
            order: { version: 'DESC' }
        });

        const nextVersion = lastEvent ? lastEvent.version + 1 : 1;

        const event = this.documentEventRepository.create({
            documentId,
            version: nextVersion,
            type: 'updated',
            payload: {
                actorId,
                update: Buffer.from(updateBuffer).toString('base64'),
            }
        });

        await this.documentEventRepository.save(event);
    }
}