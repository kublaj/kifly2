import { expect } from 'chai';
import { UidLib } from './uid.lib';

describe('UidLib', () => {

    it('should be unique', () => {
        const unique1 = UidLib.generate();
        const unique2 = UidLib.generate();

        expect(unique1).not.to.equal(unique2)
    });

    it('should be correct length', () => {
        const lentgh = Math.ceil(Math.random() * 10e3);
        const unique1 = UidLib.generate(lentgh);
        const unique2 = UidLib.generate(lentgh);

        expect(unique1).to.have.lengthOf(lentgh * 2);
        expect(unique2).to.have.lengthOf(lentgh * 2);
    });
});