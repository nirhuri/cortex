import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsModule } from './documents/document.module';
import { ConfigModule } from '@nestjs/config';
import { DocumentEvent } from '@docs/documents/db/entities/document-event.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        username: process.env.DB_USERNAME || 'document_user',
        password: process.env.DB_PASSWORD || 'document_pass',
        database: process.env.DB_NAME || 'document_db',
        entities: [Document, DocumentEvent],
        synchronize: true,
      }),
    }),
    DocumentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
