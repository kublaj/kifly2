import 'reflect-metadata'

import { BaseEntity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { UserEntity } from './user.entity';

@Entity('users')
export class AddressEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public postCode: string;

    @Column()
    public address: string;

    @ManyToOne(type => UserEntity, user => user.address)
    public user: UserEntity;

    constructor(options: any = {}) {
        super();
        this.postCode = options.postCode;
        this.address = options.address;
    }
}