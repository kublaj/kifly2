import { CrudServiceInterface } from '../../src/libs/controller/libs/crud-service.interface';
import { Inject } from '../../src/libs/inject/decorator';
import { Service } from '../../src/libs/service/decorator';
import { ServiceTypes } from '../../src/libs/service/type';
import { OrmService } from '../../src/services/orm.service';
import { FooEntity } from '../entities/foo.entity';

@Service(ServiceTypes.Factory)
export class ExampleCrudService implements CrudServiceInterface<FooEntity> {
    @Inject private ormService: OrmService;

    public listItems(query: any): Promise<FooEntity[]> {
        return this.ormService.getConnection()
            .getRepository(FooEntity)
            .find();
    }

    public getItem(id: string): Promise<FooEntity> {
        return this.ormService.getConnection()
            .getRepository(FooEntity)
            .findOneById(id);
    }

    public createItem(body: any): Promise<FooEntity> {
        return this.ormService.getConnection().manager.save(new FooEntity(body));
    }

    public async updateItem(id: string, body: any): Promise<any> {
        if (!await this.getItem(id)) {
            return Promise.reject('NOT_FOUND');
        }
        return this.ormService.getConnection()
            .getRepository(FooEntity)
            .updateById(id, new FooEntity(body));
    }

    public async deleteItem(id: string): Promise<any> {
        if (!await this.getItem(id)) {
            return Promise.reject('NOT_FOUND');
        }
        return this.ormService.getConnection()
            .getRepository(FooEntity)
            .removeById(id);
    }

}
