import { Controller } from '../../src/libs/controller/decorator';
import { Route } from '../../src/libs/server/route/decorator';

@Controller('/')
export class IndexController {

    @Route('get', '')
    public indexEndpoint(req, res) {
        res.status(200).json(req.query);
    }

}
