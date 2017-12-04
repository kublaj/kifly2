import { now } from 'microtime';

export class Log {
    public level: string;
    public payload: any;
    public time: number;
    public place: any;

    constructor(level: string, payload: string) {
        this.level = level;
        this.payload = payload;
        this.time = now();

        const error = new Error('GetLineOfCodeError');
        const raw = error.stack.split('\n')[2];
        const place = raw.match(/\(.*.\)$/);
        this.place = place.length ? place[0] : '';
    }
}
