import * as bodyParser from 'body-parser';
import { Kernel } from '../src/kernel';
import { ServerTypes } from '../src/libs/server/server-types';
import { ExampleController } from './controllers/example.controller';
import { IndexController } from './controllers/index.controller';
import { ComplexService } from './services/complex.service';
import { FactoryService } from './services/factory.service';
import { SimpleService } from './services/simple.service';

const kernel = new Kernel({
    controllers: [
        IndexController,
        ExampleController,
    ],
    server: {
        configureFramework: (app: Express.Application | any, express: any) => {
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
