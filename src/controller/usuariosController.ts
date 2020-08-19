import { Request, Response } from 'express';
import { Error } from 'sequelize';
import { responseError } from '../utils/serviceResponse';
import Usuario from '../models/usuario';

class UsuariosController {

    async listUsuarios(request: Request, response: Response) {

        await Usuario.findAll().then(
            (users) => {
                response.json(users);
            })
            .catch((error: Error) =>
                responseError(error, response));

    }
}

export default new UsuariosController();