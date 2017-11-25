import { Controller } from '../../src/libs/controller/decorator';
import { Route } from '../../src/libs/server/route/decorator';

@Controller('/example')
export class ExampleController {

    @Route('get', '')
    public index(req, res) {
        res.status(200).send();
    }

}
