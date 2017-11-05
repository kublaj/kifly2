import { Controller } from '../../src/libs/controller/decorator';
import { Inject } from '../../src/libs/inject/decorator';
import { Route } from '../../src/libs/server/route/decorator';
import { ComplexService } from '../services/complex.service';

@Controller()
export class IndexController {
    @Inject private complexService: ComplexService;
    
    @Route('get', '/')
    public testRoute(req, res) {
        res.send(this.complexService.simpleService.getUid());
    }
}
