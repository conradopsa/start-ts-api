import { Request, Response } from 'express';
import { Error } from 'sequelize';
import { responseSequelizeError } from '../utils/serviceResponse';
import Usuario from '../models/usuario';

class UsuariosService {

    async listUsuarios(request: Request, response: Response) {

        await Usuario.findAll().then(
            (users) => {
                response.json(users);
            })
            .catch((err: Error) =>
                responseSequelizeError(err, response));

    }
}

export default new UsuariosService();