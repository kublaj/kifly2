import { Controller } from '../../src/libs/controller/decorator';
import { Inject } from '../../src/libs/inject/decorator';
import { Route } from '../../src/libs/server/route/decorator';
import { CrudControllerGenerator } from '../libs/crud-controller.generator';
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

    @Route('get', '/:id')
    public rewriteAController(req, res) {
        res.send(this.complexService.simpleService.getUid());
    }
}
