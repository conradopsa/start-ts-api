import { Request, Response } from 'express';

class UsuariosService {
    listUsuarios(request: Request, response: Response) {
        response.json({
            "users": ["users list"]
        })
    }
}

export default new UsuariosService();