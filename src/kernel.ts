import { Subject } from 'rxjs/Subject';
import { Container } from './libs/container/container';
import { KernelEvent } from './libs/kernel-event';
import { KernelOptions } from './models/kernel-options.model';

export class Kernel {
    private controllers: any;
    private services: any;
    public events$: Subject<any> = new Subject();

    public container = new Container();

    constructor(options: KernelOptions = {}) {
        this.controllers = options.controllers || [];
        this.services = options.services || [];
        this.emitEvent('onKernelInitialze', this);
        this.activateServices();
        this.activateController();
    }

    private activateServices() {
        this.emitEvent('onServicesPreActivated', this.services);

        this.services.forEach(item => {
            this.container.addMember(item);
        });
    }

    private activateController() {
        this.emitEvent('onControllersPreActivated', this.controllers);

        this.controllers.forEach(controller => {
            this.container.resolveController(controller);
        });
    }

    private emitEvent(name: string, payload: any) {
        this.events$.next(new KernelEvent(name, payload));
    }
}
