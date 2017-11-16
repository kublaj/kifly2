import { now } from 'microtime';
import { QueryLib } from '../libs/query.lib';
import { Service } from '../libs/service/decorator';
import { ServiceTypes } from '../libs/service/type';

@Service(ServiceTypes.Singleton)
export class IoService {
    private request: Express.Request | any;
    private response: Express.Response | any;

    public updateRequest(request: Express.Request | any) {
        this.request = request;

        /**
         * Update query
         * @type {any}
         */
        this.request.query = request.query = QueryLib.parse(request);

        /**
         * Register start time to benchmark
         */
        this.request.startTime = now();
    }

    public updateResponse(response: Express.Response | any) {
        this.response = response;
    }

    public getRequest(): Express.Request {
        return this.request;
    }
}
