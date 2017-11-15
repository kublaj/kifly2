import { randomBytes } from 'crypto';

export class UidLib {
    public static generate(length = 12) {
        return randomBytes(length).toString('hex');
    }
}
