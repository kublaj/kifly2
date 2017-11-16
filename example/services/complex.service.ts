import { Inject } from '../../src/libs/inject/decorator';
import { Service } from '../../src/libs/service/decorator';
import { ServiceTypes } from '../../src/libs/service/type';
import { FactoryService } from './factory.service';
import { SimpleService } from './simple.service';

@Service(ServiceTypes.Singleton)
export class ComplexService {
    @Inject public simpleService: SimpleService;
    @Inject public factoryService: FactoryService;
}
