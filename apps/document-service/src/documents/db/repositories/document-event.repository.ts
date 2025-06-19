import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DocumentEvent } from "../entities/document-event.entity";
import { MoreThan, Repository } from "typeorm";
import { DocumentEventRepositoryInterface } from "./document-event.repository.interface";


@Injectable()
export class DocumentEventRepository implements DocumentEventRepositoryInterface {
    constructor(@InjectRepository(DocumentEvent)
    private readonly repo: Repository<DocumentEvent>) { }

    async create(event: Partial<DocumentEvent>): Promise<DocumentEvent> {
        return this.repo.create(event);
    }

    async findEventsFromLastSnapshot(documentId: string, version: number): Promise<DocumentEvent[]> {
        return await this.repo.find({
            where: { documentId, version: MoreThan(version) },
            order: { version: 'ASC' },
        });
    }
}