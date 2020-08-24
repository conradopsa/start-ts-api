import Usuario from '../models/usuario';
import Ingresso from '../models/ingresso';
import IngressoComprado from '../models/ingressoComprado';

import { Request, Response } from 'express';
import { responseError, responseDeleted, responseNotFound } from '../utils/serviceResponse';
import { toBoolean } from '../utils/convert';

async function ticketNotFound(response: Response) {
    return responseNotFound(response, "Ingressos não encontrados")
}

class CompraIngressoController {
    async listarIngressosComprados(request: Request, response: Response) {
        try {
            await IngressoComprado.findAll().then(users => response.json(users))
        } catch (error) {
            responseError(error, response);
        }
    }

    async inserirCompraIngresso(request: Request, response: Response) {
        try {
            const { idIngresso, idUsuario } = request.params;

            const newTicket = await IngressoComprado.create({
                idUsuario: idUsuario.toString(),
                idIngresso: idIngresso.toString()
            });

            return response.json(newTicket);
        } catch (error) {
            responseError(error, response);
        }
    }
}

export default new CompraIngressoController();