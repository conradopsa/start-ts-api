import Usuario from '../models/usuario';
import IngressoComprado, {basicAttributes as ingressoCompradoBasicAttributes} from '../models/ingressoComprado';
import Ingresso  from '../models/ingresso'
import { Request, Response } from 'express';
import { responseError, responseDeleted } from '../utils/serviceResponse';

function userNotFound(response: Response) {
    response.status(404).send("Usuário não encontrado");
}

class UsuarioController {

    async getUsuario(request: Request, response: Response) {
        const { id } = request.params;
        const { ticketPurchased } = request.query;

        await Usuario.findByPk(id, {
            include: ticketPurchased ?
                { model: IngressoComprado, as: 'ingressosComprados', include: [Ingresso], attributes: ingressoCompradoBasicAttributes }
                : undefined
        })
            .then((user) => {
                if (user)
                    response.json(user)
                else
                    userNotFound(response);

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
            if (user)
                user.update(body).then(user => response.send(user));
            else
                userNotFound(response);
        })
    }

    async deleteUsuario(request: Request, response: Response) {
        const { cpf } = request.params;

        await Usuario.findByPk(cpf).then(user => {
            if (user)
                user.destroy().then(() =>
                    responseDeleted(response, "Usuário deletado!", user));
            else
                userNotFound(response);
        })
            .catch((error: Error) =>
                responseError(error, response));
    }
}

export default new UsuarioController();