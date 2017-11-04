import 'reflect-metadata';
import { ServiceConstants } from '../service/constants';
import { ServiceTypes } from '../service/type';
import { UidLib } from '../uid.lib';

export const Controller = (): any => {
    return (target) => {
        Reflect.defineMetadata(ServiceConstants.DecoratorId, UidLib.generate(20), target);
        Reflect.defineMetadata(ServiceConstants.DecoratorType, ServiceTypes.Factory, target);
        return target;
    }
};
