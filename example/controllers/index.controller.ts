import { Controller } from '../../src/libs/controller/decorator';
import { Inject } from '../../src/libs/inject/decorator';
import { ComplexService } from '../services/complex.service';

@Controller()
export class IndexController {
    @Inject private complexService: ComplexService;

    constructor() {
        console.log('CONSTRUCED', this.complexService.simpleService.getUid());
    }
}
