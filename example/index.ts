import * as bodyParser from 'body-parser';
import { resolve } from 'path';
import * as pug from 'pug';
import { Kernel } from '../src/kernel';
import { ServerTypes } from '../src/libs/server/server-types';
import { ExampleController } from './controllers/example.controller';
import { IndexController } from './controllers/index.controller';
import { ComplexService } from './services/complex.service';
import { FactoryService } from './services/factory.service';
import { RethinkService } from './services/rethink.service';
import { SimpleService } from './services/simple.service';

const kernel = new Kernel({
    controllers: [
        IndexController,
        ExampleController,
    ],
    server: {
        configureFramework: (app: Express.Application | any, express: any) => {
            app.set('view engine', pug);
            app.set('views', resolve(__dirname, 'views'));
            app.use('/', express.static(resolve(__dirname, 'views')));

            // Rest part
            app.use(bodyParser.json());
        },
        serverPort: 3030,
        serverType: ServerTypes.Http,
    },
    services: [
        SimpleService,
        ComplexService,
        FactoryService,
        RethinkService,
    ],
});
