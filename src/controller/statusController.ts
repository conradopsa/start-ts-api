import {Request, Response} from 'express';

class StatusController {
    status(request: Request, response: Response) {
        response.send('Sucesso!');
    }
}

export default new StatusController();