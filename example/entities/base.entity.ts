import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn, VersionColumn } from 'typeorm';
import { Index } from 'typeorm/decorator';
import { Generated } from 'typeorm/decorator/Generated';

export abstract class BaseEntity {

    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    @Index('index-uid')
    @Generated('uuid')
    public uid: string;

    @VersionColumn()
    public version: string;

    @CreateDateColumn()
    public createdAt: string;

    @UpdateDateColumn()
    public updatedAt: string;
}
