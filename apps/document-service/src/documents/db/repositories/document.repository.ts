// apps/document-service/src/documents/document.repository.ts
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '@docs/documents/db/entities/document.entity';
import { DocumentRepositoryInterface } from '@docs/documents/db/repositories/document.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentRepository implements DocumentRepositoryInterface {
    constructor(
        @InjectRepository(Document)
        private readonly repo: Repository<Document>,
    ) { }

    async create(document: Partial<Document>): Promise<Document> {
        const created = this.repo.create(document);
        return this.repo.save(created);
    }

    async findById(id: string): Promise<Document | null> {
        return this.repo.findOne({ where: { id } });
    }

    async findAllByUser(userId: string): Promise<Document[]> {
        return this.repo.find({ where: { ownerId: userId } });
    }

    async update(id: string, updates: Partial<Document>): Promise<Document> {
        await this.repo.update(id, updates);
        const updated = await this.repo.findOne({ where: { id } });
        if (!updated) throw new Error("Document not found after update");
        return updated;
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}