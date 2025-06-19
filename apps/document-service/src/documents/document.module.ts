import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '@docs/documents/db/entities/document.entity';
import { DocumentEvent } from '@docs/documents/db/entities/document-event.entity';
import { DocumentCommandService } from './services/document-command.service';
import { DocumentRepository } from './db/repositories/document.repository';
import { DocumentService } from './services/document.service';
import { DocumentController } from './document.controller';
import { DocumentQueryService } from '@docs/documents/services/document-query.service';
import { SnapshotService } from './services/snapshot.service';
import { DocumentEventRepository } from './db/repositories/document-event.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Document, DocumentEvent])],
    providers: [
        DocumentCommandService,
        DocumentQueryService,
        SnapshotService,
        {
            provide: 'DocumentRepository',
            useClass: DocumentRepository,
        },
        {
            provide: 'DocumentEventRepository',
            useClass: DocumentEventRepository,
        },
        {
            provide: DocumentService,
            useFactory: () => {
                const { createClient } = require('redis');
                const redis = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
                redis.connect();
                return new DocumentService(redis);
            },
        },
    ],
    controllers: [DocumentController],
    exports: [DocumentCommandService, DocumentQueryService, SnapshotService],
})
export class DocumentsModule { }