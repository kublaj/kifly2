import { Service } from '../libs/service/decorator';
import { ServiceTypes } from '../libs/service/type';

@Service(ServiceTypes.Singleton)
export class ExpressIoService {
    private req: any;
    private res: any;
    private app: any;

    public updateRequest(req: any) {
        this.req = req;
    }

    public updateResponse(res: any) {
        this.res = res;
    }

    public updateApp(app: any) {
        this.app = app;
    }

    public getRequest(): any {
        return this.req;
    }

    public getResponse(): any {
        return this.res;
    }

    public getApp(): any {
        return this.app;
    }
}
