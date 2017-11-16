import { Kernel } from '../src/kernel';
import { ServerTypes } from '../src/libs/server/server-types';
import { IndexController } from './controllers/index.controller';
import { ComplexService } from './services/complex.service';
import { FactoryService } from './services/factory.service';
import { SimpleService } from './services/simple.service';

const kernel = new Kernel({
    controllers: [
        IndexController,
    ],
    server: {
        configureFramework: (app: Express.Application | any, express: any) => {
            app.use((req, res, next) => {
                /* tslint:disable-next-line */
                console.log('Hllo');
                next();
            });
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
