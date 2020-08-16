import {Request, Response} from 'express';

class StatusService {
    status(request: Request, response: Response) {
        response.send('Sucesso!');
    }
}

export default new StatusService();