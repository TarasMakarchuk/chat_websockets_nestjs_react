import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('messages')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    userWsId: string;

    @CreateDateColumn({name: 'created_at'})
    createdAt?: string;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt?: string;
}
