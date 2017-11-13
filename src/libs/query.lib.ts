import * as querystring from 'querystring';
import { parse } from 'url';

export class QueryLib {
    public static parse?(req: Express.Request | any): any {
        const url = parse(req.url);
        return querystring.parse(url.query);
    }
}
