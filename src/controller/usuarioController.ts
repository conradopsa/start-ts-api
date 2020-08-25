import Usuario from '../models/usuario';
import { Request, Response } from 'express';
import { responseError, responseDeleted, responseNotFound } from '../utils/serviceResponse';
import { toBoolean } from '../utils/convert';

async function userNotFound(response: Response) {
    return responseNotFound(response, "Usuário não encontrado")
}

class UsuarioController {
    async listUsuarios(request: Request, response: Response) {
        try {
            await Usuario.findAll().then(users => response.json(users))
        } catch (error) {
            responseError(error, response);
        }
    }

    async getUsuario(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { ingressosComprados } = request.query;

            let scopeUsuario = toBoolean(ingressosComprados?.toString()) ?
                Usuario.scope('withIngressos') : Usuario;

            await scopeUsuario.findByPk(id)
                .then((user) => {
                    if (!user)
                        return userNotFound(response);

                    return response.json(user)
                })
        } catch (error) {
            responseError(error, response);
        }
    }

    async postUsuario(request: Request, response: Response) {
        try {
            const body = request.body;
            const newUser = await Usuario.create(body)

            response.json(newUser);
        } catch (error) {
            responseError(error, response);
        }
    }

    async putUsuario(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const body = request.body;

            await Usuario.findByPk(id).then(user => {
                if (!user)
                    return userNotFound(response);

                return user.update(body).then(user => response.send(user));
            })
        } catch (error) {
            responseError(error, response);
        }
    }

    async deleteUsuario(request: Request, response: Response) {
        try {
            const { id } = request.params;

            await Usuario.findByPk(id).then(user => {
                if (!user)
                    return userNotFound(response);

                return user.destroy().then(() =>
                    responseDeleted(response, "Usuário deletado!", user));

            })
        } catch (error) {
            responseError(error, response);
        }
    }
}

export default new UsuarioController();