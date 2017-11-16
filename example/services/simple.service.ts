import { Service } from '../../src/libs/service/decorator';
import { ServiceTypes } from '../../src/libs/service/type';
import { UidLib } from '../../src/libs/uid.lib';

@Service(ServiceTypes.Singleton)
export class SimpleService {
    private uid = UidLib.generate(12);

    public getUid() {
        return this.uid;
    }
}
