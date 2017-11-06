import * as CliTable from 'cli-table';
import * as express from 'express';
import { createServer as createHttpServer, Server as HttpServer } from 'http';
import { createServer as createHttpsServer, Server as HttpsServer, ServerOptions as HttpsServerOptions } from 'https';
import { Container } from '../container/container';
import { RouteModel } from './route/model';

export class Server {
    private members: RouteModel[] = [];
    private server: HttpServer | HttpsServer;
    private app = express();
    private isConfigured = false;

    public addRoute(route: RouteModel) {
        this.members.push(route);
    }

    public activateRoutes(container: Container) {
        for (let route of this.members) {
            this.app[route.httpMethod](route.path, (req, res, next) => {
                return container.resolveController(route.controller.constructor)[route.method](req, res, next);
            });
        }
    }

    public async httpServer(port = 8080): Promise<any> {
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
        const table = new CliTable({
            head: ['Method', 'Controller::Method', 'Path']
        });
        for (let route of routes) {
            table.push([
                route.httpMethod.toUpperCase(),
                route.controller.constructor.name + '::' + route.method,
                route.path
            ]);
        }

        console.log(table.toString());
    }
}