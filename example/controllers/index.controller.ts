import { Controller } from '../../src/libs/controller/decorator';
import { CrudControllerGenerator } from '../../src/libs/controller/libs/crud-controller.generator';
import { Inject } from '../../src/libs/inject/decorator';
import { ComplexService } from '../services/complex.service';
import { ExampleCrudService } from '../services/example-crud.service';

@Controller('/index')
export class IndexController extends CrudControllerGenerator {
    @Inject private complexService: ComplexService;
    @Inject private exampleCrudSource: ExampleCrudService;

    constructor() {
        super();
        this.setCrudSource(this.exampleCrudSource);
    }
}
