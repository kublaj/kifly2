import { now } from 'microtime';
import { QueryLib } from '../libs/query.lib';
import { Service } from '../libs/service/decorator';
import { ServiceTypes } from '../libs/service/type';

@Service(ServiceTypes.Singleton)
export class IoService {
    private app: Express.Application | any;
    private request: Express.Request | any;
    private response: Express.Response | any;
    private avg = 0;

    public updateRequest(request: Express.Request | any) {
        this.request = request;
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

        /**
         * What does the request says??! Micro micro micrp microsec, Mimicro mic...
         * Register start time to benchmark
         */
        this.app.use((request, response, next) => {
            const startOfRequest = now();

            request.query = QueryLib.parse(request);
            response.on('finish', () => {
                this.logRequest(request, startOfRequest, now());
            });

            this.request = request;
            this.response = response;
            next();
        });
    }

    public getApp(): Express.Application | any {
        return this.app;
    }

    private logRequest(req, startedAt, endedAt) {
        const requestTime = (endedAt - startedAt) / 10e3;
        this.avg = (requestTime + this.avg) / 2;
        /* tslint:disable-next-line */
        console.log(req.url, `${requestTime} ms`);
    }
}
