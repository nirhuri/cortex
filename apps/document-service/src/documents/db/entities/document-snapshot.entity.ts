import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DocumentSnapshot {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    documentId!: string;

    @Column()
    version!: number;

    @Column({ type: 'jsonb' })
    state!: Record<string, any>;

    @CreateDateColumn()
    createdAt!: Date;
}