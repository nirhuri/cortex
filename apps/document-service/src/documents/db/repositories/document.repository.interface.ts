import { Document } from "@docs/documents/db/entities/document.entity";

export interface DocumentRepositoryInterface {
    create(document: Partial<Document>): Promise<Document>;
    findById(id: string): Promise<Document | null>;
    findAllByUser(userId: string): Promise<Document[]>;
    update(id: string, updates: Partial<Document>): Promise<Document>;
    delete(id: string): Promise<void>;
}