import { Request, Response, NextFunction } from 'express';

/**
 * Allow CORS to all websites
 */
export function allowCORS(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');

    if (req.method === 'OPTIONS')
        return res.sendStatus(200);
    else
        return next();
}