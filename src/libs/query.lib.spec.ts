import { expect } from 'chai';
import { QueryLib } from './query.lib';

describe('QueryLib', () => {
    const url1 = 'http://example.org?foo=13';
    const url2 = 'http://example.org?foo=13&bar=14';
    const url3 = 'http://example.org?foo[]=11&foo[]=12';

    it('should be works fine', () => {
        const parsed1 = QueryLib.parse(url1);
        const parsed2 = QueryLib.parse(url2);
        const parsed3 = QueryLib.parse(url3);

        expect(parsed1)
            .has.property('foo')
            .that.equal('13');

        expect(parsed2)
            .has.property('foo')
            .that.equal('13');

        expect(parsed2)
            .has.property('bar')
            .that.equal('14');

        expect(parsed3)
            .has.property('foo[]')
            .that.to.have.lengthOf(2);
    });

});
