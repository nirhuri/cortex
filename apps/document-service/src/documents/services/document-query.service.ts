import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Document } from "@docs/documents/db/entities/document.entity";
import { Inject } from "@nestjs/common";
import { DocumentEvent } from "../db/entities/document-event.entity";
import { SnapshotService } from "./snapshot.service";
import { DocumentEventRepositoryInterface } from "../db/repositories/document-event.repository.interface";


export class DocumentQueryService {
    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
        @Inject("DocumentEventRepository")
        private readonly documentEventRepo: DocumentEventRepositoryInterface,
        @Inject(SnapshotService)
        private readonly snapshotService: any,
    ) { }
    async findByUser(userId: string): Promise<Document[]> {
        return this.documentRepository.find({
            where: {
                ownerId: userId,
                isDeleted: false,
            },
            order: {
                createdAt: "DESC",
            },
        });
    }

    async findById(id: string): Promise<Document | null> {
        return this.documentRepository.findOne({ where: { id, isDeleted: false } });
    }

    async rebuildDocument(documentId: string): Promise<Record<string, any>> {
        const snapshot = await this.snapshotService.getLatest(documentId);
        let state = snapshot?.state ?? {};
        const lastVersion = snapshot?.version ?? 0;

        const events = await this.documentEventRepo.findEventsFromLastSnapshot(documentId, lastVersion);

        for (const event of events) {
            state = this.applyEvent(state, event);
        }

        return state;
    }

    private applyEvent(state: Record<string, any>, event: DocumentEvent): Record<string, any> {
        switch (event.type) {
            case 'created':
                return {
                    title: event.payload.title,
                    ownerId: event.payload.actorId,
                    teamId: event.payload.teamId,
                    isDeleted: false,
                };
            case 'updated':
                return { ...state, ...event.payload };
            case 'deleted':
                return { ...state, isDeleted: true };
            default:
                return state;
        }
    }
}