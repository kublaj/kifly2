import { Container } from './libs/container/container';
import { RouteConstants } from './libs/server/route/constants';
import { RouteModel } from './libs/server/route/model';
import { Server } from './libs/server/server';
import { KernelOptions } from './models/kernel-options.model';

export class Kernel {
    private controllers: any;
    private services: any;

    public container = new Container();
    public server = new Server();

    constructor(options: KernelOptions = {}) {
        this.controllers = options.controllers || [];
        this.services = options.services || [];
        this.activateServices();
        this.activateController();

        this.server.activateRoutes(this.container);
        this.server.createHttpServer();
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
}
