import { Service } from '../libs/service/decorator';
import { ServiceTypes } from '../libs/service/type';
import { QueryLib } from '../libs/query.lib';

@Service(ServiceTypes.Singleton)
export class RequestService {
    private request: Express.Request | any;

    public updateRequest(request: Express.Request | any) {
        this.request = request;

        /**
         * Update query
         * @type {any}
         */
        this.request.query = request.query = QueryLib.parse(request);
    }

    public getRequest(): Express.Request {
        return this.request;
    }
}