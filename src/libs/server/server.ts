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

    public async createHttpServer() {
        if (this.isConfigured) {
            throw new Error('Server (Http) error: a server has been already configured!');
        }
        this.server = createHttpServer(this.app);
        this.server.listen(3033);
    }

    public async createHttpsServer(options: HttpsServerOptions = {}) {
        if (this.isConfigured) {
            throw new Error('Server (Https) error: a server has been already configured!');
        }
        this.server = createHttpsServer(options, this.app);
        this.server.listen(3033);
    }
}