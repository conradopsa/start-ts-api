import Usuario from '../models/usuario';
import { Request, Response } from 'express';
import { responseError, responseDeleted } from '../utils/serviceResponse';
import { toBoolean } from '../utils/convert';

function userNotFound(response: Response) {
    response.status(404).send("Usuário não encontrado");
}

class UsuarioController {
    async listUsuarios(request: Request, response: Response) {

        await Usuario.findAll().then(
            (users) => {
                response.json(users);
            })
            .catch((error: Error) =>
                responseError(error, response));

    }

    async getUsuario(request: Request, response: Response) {
        const { id } = request.params;
        const { ingressosComprados } = request.query;

        let scopeUsuario = toBoolean(ingressosComprados?.toString()) ? 
            Usuario.scope('withIngressos') : Usuario;

        await scopeUsuario.findByPk(id)
            .then((user) => {
                if (!user)
                    return userNotFound(response);

                response.json(user)
            })
            .catch((error: Error) =>
                responseError(error, response));
    }

    async postUsuario(request: Request, response: Response) {
        const body = request.body;

        const newUser = await Usuario.create(body)
            .catch((error: Error) =>
                responseError(error, response));

        response.json(newUser);
    }

    async putUsuario(request: Request, response: Response) {
        const { id } = request.params;
        const body = request.body;

        await Usuario.findByPk(id).then(user => {
            if (!user)
                return userNotFound(response);

            user.update(body).then(user => response.send(user));
        })
    }

    async deleteUsuario(request: Request, response: Response) {
        const { cpf } = request.params;

        await Usuario.findByPk(cpf).then(user => {
            if (!user)
                return userNotFound(response);

            user.destroy().then(() =>
                responseDeleted(response, "Usuário deletado!", user));

        })
            .catch((error: Error) =>
                responseError(error, response));
    }
}

export default new UsuarioController();