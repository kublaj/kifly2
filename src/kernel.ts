import { Container } from './libs/container/container';
import { RouteConstants } from './libs/server/route/constants';
import { RouteModel } from './libs/server/route/model';
import { Server } from './libs/server/server';
import { ServerTypes } from './libs/server/server-types';
import { KernelOptions, KernelServerOptions } from './models/kernel-options.model';
import { RequestService } from './services/request.service';

export class Kernel {
    private controllers: any;
    private services: any;
    private documents: any;
    public container = new Container();
    public server = new Server();

    constructor(options: KernelOptions) {
        this.controllers = options.controllers || [];
        this.services = options.services || [];
        this.documents = options.documents || [];
        /**
         * Register default services
         */
        this.container.addMember(RequestService);

        this.activateServices();
        this.activateController();

        if (options.server) {
            this.server.activateRoutes(this.container);
            this.startServer(options.server || {});
        }

    }

    private activateServices() {
        this.services.forEach(item => {
            this.container.addMember(item);
        });
    }

    private activateController() {
        this.controllers.forEach(controller => {
            this.container.resolveController(controller, controller => {
                this.configureController(controller);
            });
        });
    }

    private configureController(controller) {
        /**
         * Resolve routes for express
         */
        const routes: RouteModel[] = Reflect.getMetadata(RouteConstants.InjectedRoutes, controller) || [];
        for (let route of routes) {
            this.server.addRoute(route);
        }
    }

    private async startServer(options: KernelServerOptions) {
        switch (options.serverType) {
            case ServerTypes.Http: {
                const result = await this.server.httpServer(options.serverPort);
                break;
            }
            case ServerTypes.Https: {
                const result = await this.server.httpsServer(options.serverPort, options.serverOptions);
                break;
            }
            default: {
                const result = await this.server.httpServer(options.serverPort);
            }
        }
    }
}
