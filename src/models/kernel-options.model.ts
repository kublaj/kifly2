import { ServerOptions as HttpsServerOptions } from 'https';
import { ServerTypes } from '../libs/server/server-types';

export interface KernelServerOptions {
    serverPort?: number;
    serverType?: ServerTypes;
    serverOptions?: HttpsServerOptions;
}

export interface KernelOptions {
    controllers?: any[];
    services?: any[];
    documents?: any[];
    events?: any;
    server?: KernelServerOptions | any;
}
