import { Kernel } from '../src/kernel';
import { ServerTypes } from '../src/libs/server/server-types';
import { IndexController } from './controllers/index.controller';
import { ComplexService } from './services/complex.service';
import { FactoryService } from './services/factory.service';
import { SimpleService } from './services/simple.service';

const kernel = new Kernel({
    services: [
        SimpleService,
        ComplexService,
        FactoryService,
    ],
    controllers: [
        IndexController,
    ],
    server: {
        serverPort: 3030,
        serverType: ServerTypes.Http,
    },
});

/**
 createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: "kifly2-test",
    entities: [
        UserEntity,
        AddressEntity
    ],
    synchronize: true,
    logging: false
}).then(async (connection) => {
    const user = new UserEntity({
        lastName: 'Pimpli',
        firstName: 'Bence',
        address: [
            await connection.manager.save(new AddressEntity({
                postCode: '2049',
                address: 'Patak utca 2'
            })),
            await connection.manager.save(new AddressEntity({
                postCode: '2049',
                address: 'Patak utca 2'
            }))
        ]
    });
    const u = await connection.manager.save(user);
    console.log(u);
    // here you can start to work with your entities
}).catch(error => console.log(error));

 */
