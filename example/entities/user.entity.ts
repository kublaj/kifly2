import 'reflect-metadata'

import { BaseEntity, Column, JoinColumn, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { AddressEntity } from './address.entity';

@Entity('users')
export class UserEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public firstName: string;

    @Column()
    public lastName: string;

    @OneToMany(type => AddressEntity, address => address.user)
    public address: AddressEntity[];

    constructor(options: any = {}) {
        super();
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.address = options.address;
    }
}