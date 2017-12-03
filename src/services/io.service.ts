import { now } from 'microtime';
import { QueryLib } from '../libs/query.lib';
import { Service } from '../libs/service/decorator';
import { ServiceTypes } from '../libs/service/type';

@Service(ServiceTypes.Singleton)
export class IoService {
    private app: Express.Application | any;
    private request: Express.Request | any;
    private response: Express.Response | any;

    public updateRequest(request: Express.Request | any) {
        this.request = request;
    }

    public getRequest(): Express.Request | any {
        return this.request;
    }

    public updateResponse(response: Express.Response | any) {
        this.response = response;
    }

    public getResponse(): Express.Response | any {
        return this.response;
    }

    public updateApp(app: Express.Application | any) {
        this.app = app;

        /**
         * What does the request says??! Micro micro micrp microsec, Mimicro mic...
         * Register start time to benchmark
         */
        this.app.use((request, response, next) => {
            request.startedAt = now();
            request.query = QueryLib.parse(request);
            response.on('finish', () => {
                this.logRequest(request);
            });

            this.request = request;
            this.response = response;
            next();
        });
    }

    public getApp(): Express.Application | any {
        return this.app;
    }

    private logRequest(req) {
        const requestTime = (now() - req.startedAt) / 10e3;
        /* tslint:disable-next-line */
        console.log(req.url, `${requestTime} ms`);
    }
}
