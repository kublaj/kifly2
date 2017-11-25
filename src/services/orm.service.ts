import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { Service } from '../libs/service/decorator';
import { ServiceTypes } from '../libs/service/type';

@Service(ServiceTypes.Singleton)
export class OrmService {
    private connection: Connection;

    public async initialize(options: ConnectionOptions): Promise<Connection> {
        this.connection = await createConnection(options);
        return Promise.resolve(this.connection);
    }

    public getConnection(): Connection {
        return this.connection;
    }
}
