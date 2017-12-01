import { Controller } from '../../src/libs/controller/decorator';
import { Route } from '../../src/libs/server/route/decorator';
import { Crud } from '../../src/plugins/crud/crud.plugin';
import { SimpleService } from '../services/simple.service';

@Controller('/example')
@Crud(SimpleService)
export class ExampleController {

    @Route('get', '')
    public indexEndpoint(req, res) {
        res.status(200).send();
    }

}
