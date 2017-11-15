import 'reflect-metadata';
import { InjectConstants } from './constants';

export const Inject = (target, key): any => {
    Object.defineProperty(target, key, {
        configurable: true,
        enumerable: true,
        writable: true,
    });
    /**
     * Get injected services
     * It should be an array, but can be undefined, so i have to check and initialize if necessary
     * This metadata will be the property, that contains all of services for for recursive initialization
     */
    const alreadyInjected = Reflect.getMetadata(InjectConstants.InjectedServices, target.constructor) || [];

    /**
     * Push the services as an object with property of target service
     * This 'key' will be the property of injected service in future
     */
    alreadyInjected.push({
        key,
        target: Reflect.getMetadata('design:type', target, key),
    });

    /**
     * Populate metadata with object
     */
    Reflect.defineMetadata(InjectConstants.InjectedServices, alreadyInjected, target.constructor);

    return target;
};
