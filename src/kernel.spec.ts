import { expect } from 'chai';
import { ComplexService } from '../example/services/complex.service';
import { FactoryService } from '../example/services/factory.service';
import { SimpleService } from '../example/services/simple.service';
import { Kernel } from './kernel';


describe('Kernel', () => {

    let kernel = new Kernel({
        services: [
            SimpleService,
            ComplexService,
            FactoryService
        ],
        server: false
    });

    it('should has properties `controllers` & `services` as array', () => {
        expect(kernel).to.have.property('controllers').that.be.an('array');
        expect(kernel).to.have.property('services').that.be.an('array');
    });
});