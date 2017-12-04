import { now } from 'microtime';
import { Container } from '../libs/container/container';

export const RequestTimeMiddleware = (container: Container) => {

    return (req, res, next) => {
        req._startedAt = now();

        res.on('finish', () => {
            res._finishedAt = now();
        });

        next();
    };
};
