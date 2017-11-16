import { now } from 'microtime';
import { Subject } from 'rxjs/Subject';
import { QueryLib } from '../libs/query.lib';
import { Service } from '../libs/service/decorator';
import { ServiceTypes } from '../libs/service/type';

@Service(ServiceTypes.Singleton)
export class IoService {
    public log$: Subject<any> = new Subject();
    private app: Express.Application | any;
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

    public getRequest(): Express.Request {
        return this.request;
    }

    public updateResponse(response: Express.Response | any) {
        this.response = response;
    }

    public getResponse(): Express.Response {
        return this.response;
    }

    public updateApp(app: Express.Application | any) {
        this.app = app;
    }
}
