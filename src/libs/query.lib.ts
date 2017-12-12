import * as querystring from 'querystring';
import { parse, resolve } from 'url';

export class QueryLib {
    public static parse?(url: string): any {
        const parsed = QueryLib.getParsed(resolve('http://a.b', url));
        return querystring.parse(parsed);
    }

    private static getParsed(url: string): string {
        return (parse(url).query || {}).toString();
    }
}
