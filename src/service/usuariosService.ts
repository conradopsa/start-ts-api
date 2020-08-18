import { Request, Response } from 'express';
import { Error } from 'sequelize';
import { red } from 'chalk';
import { ResponseError, generateResponseError } from '../utils/serviceResponse';
import Usuario from '../models/usuario';

class UsuariosService {

    async listUsuarios(request: Request, response: Response) {

        await Usuario.findAll().then((users) => {
            response.json(users);
        }).catch((err: Error) => {
            const responseError: ResponseError = generateResponseError(err);
            response.status(500).json(responseError);

            console.error(red(err.stack));
        });

    }
}

export default new UsuariosService();