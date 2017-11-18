import { join } from 'path';

export class RouteModel {
    public httpMethod: string;
    public path: string;
    public options: any;
    public controller: any;
    public method: any;

    constructor(options: any = {}) {
        this.httpMethod = options.httpMethod;
        this.path = options.path;
        this.options = options.options;
        this.controller = options.controller;
        this.method = options.method;
    }

    public updatePath?(basePath, path): RouteModel {
        this.path = join(basePath, path);

        return this;
    }
}
