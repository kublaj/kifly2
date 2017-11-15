import 'reflect-metadata';
import { RouteConstants } from './constants';
import { RouteModel } from './model';

export const Route = (method?: string, path?: string, options?: any) => {
    return (target, key): any => {
        const routes = Reflect.getMetadata(RouteConstants.InjectedRoutes, target.constructor) || [];
        routes.push(new RouteModel({
            controller: target,
            httpMethod: method,
            method: key,
            options,
            path,
        }));
        Reflect.defineMetadata(RouteConstants.InjectedRoutes, routes, target.constructor);
        return target;
    };
};
