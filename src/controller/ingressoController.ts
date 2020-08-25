import Ingresso from '../models/ingresso';

import { Request, Response } from 'express';
import { responseError, responseNotFound } from '../utils/serviceResponse';

async function ticketNotFound(response: Response) {
    return responseNotFound(response, "Ingressos não encontrados")
}

class CompraIngressoController {
    async listarIngressosComprados(request: Request, response: Response) {
        try {
            await Ingresso.findAll().then(users => response.json(users))
        } catch (error) {
            responseError(error, response);
        }
    }

    async inserirCompraIngresso(request: Request, response: Response) {
        try {
            const { body } = request;
            const newTicket = await Ingresso.create(body);

            return response.json(newTicket);
        } catch (error) {
            responseError(error, response);
        }
    }
}

export default new CompraIngressoController();