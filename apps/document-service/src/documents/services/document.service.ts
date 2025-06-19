import * as Y from 'yjs';
import { Redis } from 'ioredis';

export class DocumentService {
    private readonly docs = new Map<string, Y.Doc>();

    constructor(private readonly redis: Redis) { }

    getDocument(documentId: string): Y.Doc | undefined {
        return this.docs.get(documentId);
    }

    createEmptyDocument(documentId: string): Y.Doc {
        const ydoc = new Y.Doc();
        this.docs.set(documentId, ydoc);
        return ydoc;
    }

    async loadDocumentFromRedis(documentId: string): Promise<Y.Doc> {
        const redisState = await this.redis.get(`doc:${documentId}`);
        if (!redisState) {
            throw new Error(`Document ${documentId} not found in Redis`);
        }

        const ydoc = new Y.Doc();
        const binary = Buffer.from(redisState, 'base64');
        Y.applyUpdate(ydoc, binary);

        this.docs.set(documentId, ydoc);
        return ydoc;
    }

    async getOrCreateDocument(documentId: string): Promise<Y.Doc> {
        if (this.docs.has(documentId)) {
            return this.docs.get(documentId)!;
        }

        try {
            return await this.loadDocumentFromRedis(documentId);
        } catch {
            return this.createEmptyDocument(documentId);
        }
    }

    async persistDocument(documentId: string): Promise<void> {
        const doc = this.docs.get(documentId);
        if (!doc) return;

        const update = Y.encodeStateAsUpdate(doc);
        const base64 = Buffer.from(update).toString('base64');

        await this.redis.set(`doc:${documentId}`, base64);
    }

    removeDocument(documentId: string): void {
        this.docs.delete(documentId);
    }
}