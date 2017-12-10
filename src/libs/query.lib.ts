import * as querystring from 'querystring';
import { resolve, URL } from 'url';

export class QueryLib {
    public static parse?(url: string): any {
        const parsed = new URL(resolve('http://a.b', url));
        return querystring.parse(parsed.searchParams.toString());
    }
}
