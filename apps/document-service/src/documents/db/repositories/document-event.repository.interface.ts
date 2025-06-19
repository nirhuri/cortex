import { DocumentEvent } from "../entities/document-event.entity";

export interface DocumentEventRepositoryInterface {
    findEventsFromLastSnapshot(documentId: string, version: number): Promise<DocumentEvent[]>;
}