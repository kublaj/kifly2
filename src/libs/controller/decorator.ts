import { Map } from 'immutable';
import { join } from 'path';
import 'reflect-metadata';
import { RouteConstants } from '../server/route/constants';
import { RouteModel } from '../server/route/model';
import { ServiceConstants } from '../service/constants';
import { ServiceTypes } from '../service/type';
import { UidLib } from '../uid.lib';

export const Controller = (basePath: string = '/'): any => {
    return (target) => {
        Reflect.defineMetadata(ServiceConstants.DecoratorId, UidLib.generate(20), target);
        Reflect.defineMetadata(RouteConstants.ControllerBasePath, basePath, target);
        Reflect.defineMetadata(ServiceConstants.DecoratorType, ServiceTypes.Factory, target);

        /**
         * Remap and update routes
         */
        const routes = Reflect.getMetadata(RouteConstants.InjectedRoutes, target) || Map({});
        const remapped = Map({}).asMutable();
        routes.forEach((route: RouteModel, key) => {
            remapped.set(UidLib.toHex(join(basePath, key)), route.updatePath(basePath, route.path));
        });

        Reflect.defineMetadata(RouteConstants.InjectedRoutes, remapped, target.constructor);
        return target;
    };
};
