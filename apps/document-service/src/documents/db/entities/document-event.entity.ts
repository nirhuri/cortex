import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export type DocumentEventType = 'created' | 'renamed' | 'updated' | 'shared' | 'deleted' | 'owner-changed';

@Entity('document_events')
export class DocumentEvent {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column()
    documentId!: string;

    @Column()
    type!: DocumentEventType;

    @Column('jsonb')
    payload!: any;

    @Column()
    actorId!: string;

    @Column()
    version!: number;

    @CreateDateColumn()
    createdAt!: Date;
}