import * as rethinkdb from 'rethinkdb';
import { Service } from '../../src/libs/service/decorator';
import { ServiceTypes } from '../../src/libs/service/type';

@Service(ServiceTypes.Singleton)
export class RethinkService {
    private connection: any;
}
