import { expect } from 'chai';
import { ComplexService } from '../../../example/services/complex.service';
import { FactoryService } from '../../../example/services/factory.service';
import { SimpleService } from '../../../example/services/simple.service';
import { Kernel } from '../../kernel';

const UID_LENTGH = 24;

describe('Container', () => {

    let kernel = new Kernel({
        services: [
            SimpleService,
            ComplexService,
            FactoryService
        ]
    });

    it('count of registered services should be count of container members', () => {
        expect(kernel.container.count()).to.equal(3)
    });

    it('should register services', () => {
        expect(kernel.container.getMember(SimpleService)).not.to.be.an('undefined');
        expect(kernel.container.getMember(FactoryService)).not.to.be.an('undefined');
        expect(kernel.container.getMember(ComplexService)).not.to.be.an('undefined');
    });

    it('[SimpleService] should has correct context', () => {
        const member: SimpleService = kernel.container.getMember(SimpleService);
        expect(member).to.has.property('uid')
            .that.to.be.an('string')
            .that.lengthOf(UID_LENTGH);
        expect(member.getUid()).to.be.an('string')
            .that.to.be.an('string')
            .that.lengthOf(UID_LENTGH);
    });

    it('[FactoryService] should has correct context', () => {
        const member: FactoryService = kernel.container.getMember(FactoryService);
        expect(member).to.has.property('uid')
            .that.to.be.an('string')
            .that.lengthOf(UID_LENTGH);
        expect(member.getUid())
            .that.to.be.an('string')
            .that.lengthOf(UID_LENTGH);
    });

    it('[Factories (FactoryService)] should be generated and should has unique initialization after constructing', () => {
        const member1: FactoryService = kernel.container.getMember(FactoryService);
        const member2: FactoryService = kernel.container.getMember(FactoryService);

        expect(member1.getUid()).to.be.an('string')
            .that.lengthOf(UID_LENTGH);
        expect(member2.getUid()).to.be.an('string')
            .that.lengthOf(UID_LENTGH);
        expect(member1.getUid()).not.to.equal(member2.getUid());
    });

    it('[Singletons (SimpleService)] should initialized once', () => {
        const member1: SimpleService = kernel.container.getMember(SimpleService);
        const member2: SimpleService = kernel.container.getMember(SimpleService);

        expect(member1.getUid()).to.be.an('string')
            .that.lengthOf(UID_LENTGH);
        expect(member2.getUid()).to.be.an('string')
            .that.lengthOf(UID_LENTGH);
        expect(member1.getUid()).to.equal(member2.getUid());
    });

    it('[Recursive initialization (ComplexService)] should has correct initialized member properties (@Inject)', () => {
        const member: ComplexService = kernel.container.getMember(ComplexService);
        expect(member).to.has.property('simpleService')
            .that.to.be.instanceof(SimpleService)
            .that.to.has.property('uid').that.to.be.an('string')
            .that.lengthOf(UID_LENTGH);
        expect(member).to.has.property('factoryService')
            .that.to.be.instanceof(FactoryService)
            .that.to.has.property('uid').that.to.be.an('string')
            .that.lengthOf(UID_LENTGH);
    });
});