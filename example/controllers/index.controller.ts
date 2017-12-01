import { Controller } from '../../src/libs/controller/decorator';
import { Route } from '../../src/libs/server/route/decorator';

@Controller('/index')
export class IndexController {

    @Route('get', '')
    public indexEndpoint(req, res) {
        res.status(200).send();
    }

}
