import { Container } from '../libs/container/container';
import { QueryLib } from '../libs/query.lib';

export const RequestParserMiddleware = (container: Container) => {

    return (req, res, next) => {
        req.query = QueryLib.parse(req.url);
        next();
    };
};
