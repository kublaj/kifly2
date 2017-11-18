import { Map } from 'immutable';
import 'reflect-metadata';
import { RouteConstants } from './constants';
import { RouteModel } from './model';

export const Route = (method?: string, path?: string, options?: any) => {
    return (target, key): any => {
        return AddRouteToTarget(method, path, options, target, key);
    };
};

export const AddRouteToTarget = (method: string, path: string, options: any, target: any, key: any) => {
    const routes = Reflect.getMetadata(RouteConstants.InjectedRoutes, target.constructor) || Map({}).asMutable();
    routes.set(`${method}_${path}`, new RouteModel({
        controller: target,
        httpMethod: method,
        method: key,
        options,
        path,
    }));
    Reflect.defineMetadata(RouteConstants.InjectedRoutes, routes, target.constructor);
    return target;
};
