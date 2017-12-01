import * as bodyParser from 'body-parser';
import { Kernel } from '../src/kernel';
import { ServerTypes } from '../src/libs/server/server-types';
import { ExampleController } from './controllers/example.controller';
import { IndexController } from './controllers/index.controller';
import { FooEntity } from './entities/foo.entity';
import { ComplexService } from './services/complex.service';
import { FactoryService } from './services/factory.service';
import { SimpleService } from './services/simple.service';

const kernel = new Kernel({
    controllers: [
        IndexController,
        ExampleController,
    ],
    orm: {
        database: 'kifly2',
        entities: [
            FooEntity,
        ],
        host: 'localhost',
        password: '',
        port: 3306,
        synchronize: true,
        type: 'mysql',
        username: 'root',
    },
    server: {
        configureFramework: (app: Express.Application | any, express: any) => {
            /**
             * Inject dependency for CrudGeneratorService
             */
            app.use(bodyParser.json());
        },
        serverPort: 3030,
        serverType: ServerTypes.Http,
    },
    services: [
        SimpleService,
        ComplexService,
        FactoryService,
    ],
});
