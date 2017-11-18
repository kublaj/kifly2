import { Service } from '../../src/libs/service/decorator';
import { ServiceTypes } from '../../src/libs/service/type';
import { CrudServiceInterface } from '../libs/crud-service.interface';

@Service(ServiceTypes.Factory)
export class ExampleCrudService implements CrudServiceInterface<any> {
    public list(query: any): Promise<any> {
        return Promise.resolve({});
    }

    public get(id: string): Promise<any> {
        return Promise.resolve({});
    }

    public create(id: string): Promise<any> {
        return Promise.resolve({});
    }

    public update(id: string): Promise<any> {
        return Promise.resolve({});
    }

    public remove(id: string): Promise<any> {
        return Promise.resolve({});
    }

}
