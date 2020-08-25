import IngressoComprado from '../models/ingressoComprado';

import { Request, Response } from 'express';
import { responseError } from '../utils/serviceResponse';

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