import { Errback, Request, Response, NextFunction } from 'express';
import { logEvents } from './logEvents';

const errorEvents = (err: Errback, req: Request, res: Response, next: NextFunction) => {
    logEvents(`${err}`, "errorLogs.txt");
    res.status(500).send(err)
}

export default errorEvents;