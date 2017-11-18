import { Kernel } from '../src/kernel';
import { ServerTypes } from '../src/libs/server/server-types';
import { IndexController } from './controllers/index.controller';
import { ComplexService } from './services/complex.service';
import { ExampleCrudService } from './services/example-crud.service';
import { FactoryService } from './services/factory.service';
import { SimpleService } from './services/simple.service';

const kernel = new Kernel({
    controllers: [
        IndexController,
    ],
    server: {
        serverPort: 3030,
        serverType: ServerTypes.Http,
    },
    services: [
        ExampleCrudService,
        SimpleService,
        ComplexService,
        FactoryService,
    ],
});
