import { Kernel } from '../src/kernel';
import { IndexController } from './controllers/index.controller';
import { ComplexService } from './services/complex.service';
import { FactoryService } from './services/factory.service';
import { SimpleService } from './services/simple.service';

const kernel = new Kernel({
    services: [
        SimpleService,
        ComplexService,
        FactoryService
    ],
    controllers: [
        IndexController
    ]
});

kernel.events$.subscribe(console.log);
