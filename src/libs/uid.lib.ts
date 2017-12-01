import { randomBytes } from 'crypto';

export class UidLib {
    public static generate(length = 12) {
        return randomBytes(length).toString('hex');
    }

    public static toHex(str: string): string {
        return (new Buffer(str)).toString('hex');
    }
}
