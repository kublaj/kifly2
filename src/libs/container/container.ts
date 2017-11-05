import { Map } from 'immutable';
import 'reflect-metadata';
import { InjectConstants } from '../inject/constants';
import { ServiceConstants } from '../service/constants';
import { ServiceTypes } from '../service/type';

export class Container {
    private members: Map<string, any> = Map({}).asMutable();
    private resolveSingletons: Map<string, any> = Map({}).asMutable();

    public addMember(member: any) {
        this.members.set(Reflect.getMetadata(ServiceConstants.DecoratorId, member), member)
    }

    public getMember(member: any, beforeMiddleware?: any) {
        const id = Reflect.getMetadata(ServiceConstants.DecoratorId, member);
        const type = Reflect.getMetadata(ServiceConstants.DecoratorType, member);
        const target = this.members.get(id);

        if (!id || !type) {
            throw new Error(`${member.name || member.constructor.name} is not a service! Use @Service or @Controller decorator`);
        }

        if (!target) {
            throw new Error(`No registered service -> ${member.name || member.constructor.name}`);
        }

        /**
         * Resolve requested service
         */
        if (beforeMiddleware && typeof beforeMiddleware === 'function') {
            beforeMiddleware(target);
        }

        return this.resolveMember(type, id, target);
    }

    public resolveController(target, beforeMiddleware?: any) {
        if (beforeMiddleware && typeof beforeMiddleware === 'function') {
            beforeMiddleware(target);
        }

        return this.resolveMember(ServiceTypes.Singleton, null, target);
    }

    public count(): number {
        return this.members.count();
    }

    private resolveMember(type: ServiceTypes, id: string, target: any) {
        /**
         * Resolve injected services of requested service
         */
        for (let item of Reflect.getMetadata(InjectConstants.InjectedServices, target) || []) {
            target.prototype[item.key] = this.getMember(item.target);
        }

        if (type === ServiceTypes.Singleton) {
            return this.activateSingleton(id, target);
        }
        if (type === ServiceTypes.Factory) {
            return this.activateFactory(id, target);
        }

        throw new Error(`No resolvable type: ${type}`);
    }

    private activateFactory(id, target) {
        return new target();
    }

    private activateSingleton(id, target) {
        if (!this.resolveSingletons.has(id)) {
            this.resolveSingletons.set(id, (new target()));
        }

        return this.resolveSingletons.get(id);
    }
}