import { Column } from 'typeorm';
import { Entity } from 'typeorm/decorator/entity/Entity';
import { BaseEntity } from './base.entity';

@Entity('foo')
export class FooEntity extends BaseEntity {
    @Column()
    public title: string;

    constructor(options: any = {}) {
        super();
        this.title = options.title;
    }
}
