import { Map } from 'immutable';
import { Connection } from 'typeorm';
import { Container } from './libs/container/container';
import { RouteConstants } from './libs/server/route/constants';
import { RouteModel } from './libs/server/route/model';
import { Server } from './libs/server/server';
import { ServerTypes } from './libs/server/server-types';
import { KernelOptions, KernelServerOptions } from './models/kernel-options.model';
import { IoService } from './services/io.service';
import { OrmService } from './services/orm.service';

export class Kernel {
    public container = new Container();
    public server = new Server();

    private controllers: any;
    private services: any;

    constructor(options: KernelOptions) {
        this.controllers = options.controllers || [];
        this.services = options.services || [];

        /**
         * Register default services
         */
        this.container.addMember(IoService);
        this.container.addMember(OrmService);

        this.start(options);
    }

    private async start(options: KernelOptions) {
        /**
         * Activate Orm
         */
        await this.activateOrm(options.orm);

        /**
         * Activate Service
         */
        this.activateServices();

        /**
         * Activate Controllers
         */
        this.activateController();

        if (options.server) {
            this.server.configureFramework(options.server.configureFramework);
            this.server.activateRoutes(this.container);
            this.startServer(options.server || {});
        }
    }

    private async activateOrm(ormOptions): Promise<any | Connection> {
        if (!ormOptions) {
            return Promise.resolve();
        }
        return (this.container.getMember(OrmService) as OrmService).initialize(ormOptions);
    }

    private activateServices() {
        this.services.forEach((item) => {
            this.container.addMember(item);
        });
    }

    private activateController() {
        this.controllers.forEach((controller) => {
            const constructed = this.container.resolveController(controller, (decorated) => {
                this.configureController(decorated);
            });

            if (constructed.onMounted) {
                constructed.onMounted(this.container);
            }
        });
    }

    private configureController(controller) {
        /**
         * Resolve routes for express
         */
        const routes: Map<string, RouteModel> = Reflect.getMetadata(RouteConstants.InjectedRoutes, controller) || [];
        routes.forEach((route) => {
            this.server.addRoute(route);
        });
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
