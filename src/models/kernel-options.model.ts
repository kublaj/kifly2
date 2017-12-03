import { ServerOptions as HttpsServerOptions } from 'https';
import { ConnectionOptions } from 'typeorm';
import { ServerTypes } from '../libs/server/server-types';

export interface KernelServerOptions {
    configureFramework?: (app?: Express.Application | any, express?: any) => void;
    serverOptions?: HttpsServerOptions;
    serverPort?: number;
    serverType?: ServerTypes;
}

export interface KernelOptions {
    controllers?: any[];
    services?: any[];
    events?: any;
    server?: KernelServerOptions | any;
}
