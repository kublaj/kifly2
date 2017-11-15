import 'reflect-metadata';
import { UidLib } from '../uid.lib';
import { ServiceConstants } from './constants';
import { ServiceTypes } from './type';

export const Service = (type?: ServiceTypes): any => {
    return (target) => {
        Reflect.defineMetadata(ServiceConstants.DecoratorId, UidLib.generate(20), target);
        Reflect.defineMetadata(ServiceConstants.DecoratorType, type, target);
        return target;
    };
};
