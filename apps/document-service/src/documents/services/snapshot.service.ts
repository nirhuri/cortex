import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DocumentSnapshot } from '../db/entities/document-snapshot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SnapshotService {
    constructor(
        @InjectRepository(DocumentSnapshot)
        private readonly snapshotRepo: Repository<DocumentSnapshot>,
    ) { }

    async createSnapshot(documentId: string, version: number, state: Record<string, any>) {
        const snapshot = this.snapshotRepo.create({
            documentId,
            version,
            state,
        });

        return this.snapshotRepo.save(snapshot);
    }

    async getLatest(documentId: string): Promise<DocumentSnapshot | null> {
        return this.snapshotRepo.findOne({
            where: { documentId },
            order: { version: 'DESC' },
        });
    }
}