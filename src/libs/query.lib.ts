import * as querystring from 'querystring';
import { parse, resolve } from 'url';

export class QueryLib {
    public static parse?(url: string): any {
        const parsed = QueryLib.getParsed(resolve('http://a.b', url));
        return querystring.parse(parsed);
    }

    private static getParsed(url: string): string {
        /*
        const under6 = semver.lt(process.version, '7.0.0');

        if (under6) {
            return parse(url).query.toString();
        } else {
            return parse(url).query.toString();
        }
         */
        return parse(url).query.toString();
    }
}
