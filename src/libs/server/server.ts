import * as CliTable from 'cli-table';
import * as express from 'express';
import { Express } from 'express';
import { createServer as createHttpServer, Server as HttpServer } from 'http';
import { createServer as createHttpsServer, Server as HttpsServer, ServerOptions as HttpsServerOptions } from 'https';
import { ExpressIoService } from '../../plugins/express-io.service';
import { RequestParserMiddleware } from '../../plugins/request-parser.middleware';
import { RequestTimeMiddleware } from '../../plugins/request-time.express-middleware';
import { Container } from '../container/container';
import { RouteModel } from './route/model';

export class Server {
    private members: RouteModel[] = [];
    private server: HttpServer | HttpsServer;
    private app = express();
    private isConfigured = false;
    private type = 'http';

    public configureFramework(callbackFunction: (app: Express.Application | any, express: any) => void) {
        if (!callbackFunction) {
            return;
        }
        return callbackFunction(this.app, express);
    }

    public addRoute(route: RouteModel) {
        this.members.push(route);
    }

    public activateRoutes(container: Container) {
        const expressIoService: ExpressIoService = container.getMember(ExpressIoService);
        /**
         * Register default middleware(s)
         */
        this.app.use(RequestTimeMiddleware(container));
        this.app.use(RequestParserMiddleware(container));

        this.members.forEach((route: RouteModel) => {
            this.app[route.httpMethod](route.path, (req, res, next) => {
                expressIoService.updateApp(this.app);
                expressIoService.updateRequest(req);
                expressIoService.updateResponse(res);
                return container.resolveController(route.controller.constructor)[route.method](req, res, next);
            });
        });
    }

    public async httpServer(port = 8080): Promise<any> {
        this.type = 'http';
        return new Promise((resolve, reject) => {
            if (this.isConfigured) {
                throw new Error('Server (Http) error: a server has been already configured!');
            }
            this.server = createHttpServer(this.app);
            this.server.listen(port, () => {
                this.showDebugTable(port, this.members);
                resolve(port);
            });
        });
    }

    public async httpsServer(port = 8080, options: HttpsServerOptions = {}): Promise<any> {
        this.type = 'https';
        return new Promise((resolve, reject) => {
            if (this.isConfigured) {
                throw new Error('Server (Https) error: a server has been already configured!');
            }
            this.server = createHttpsServer(options, this.app);
            this.server.listen(port, () => {
                this.showDebugTable(port, this.members);
                resolve(port);
            });
        });
    }

    private showDebugTable(port, routes: RouteModel[]) {
        const routesTable = new CliTable({
            head: ['Method', 'Controller::Method', 'Path'],
        });

        for (const route of routes) {
            routesTable.push([
                route.httpMethod.toUpperCase(),
                route.controller.constructor.name + '::' + route.method,
                route.path,
            ]);
        }

        const portTable = new CliTable();

        portTable.push(['SERVER STATUS', 'RUNNING']);
        portTable.push(['TYPE', this.type]);
        portTable.push(['PORT', port]);

        /* tslint:disable-next-line */
        console.log(routesTable.toString());
        /* tslint:disable-next-line */
        console.log(portTable.toString());
    }
}
