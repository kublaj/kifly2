import { Subject } from 'rxjs/Subject';
import { Service } from '../../libs/service/decorator';
import { ServiceTypes } from '../../libs/service/type';
import { Log } from './log';

@Service(ServiceTypes.Singleton)
export class LoggerService {
    private stream: Subject<any> = new Subject();

    public log(log: Log): void {
        this.stream.next(log);
    }
}
