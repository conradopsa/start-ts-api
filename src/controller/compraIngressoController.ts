import IngressoComprado from '../models/ingressoComprado';

import { Request, Response } from 'express';
import { responseError } from '../utils/serviceResponse';

import app from '../app';
import { CreateOptions } from 'sequelize/types';
const sequelize = app.database.sequelize;

class CompraIngressoController {
    async listarIngressosComprados(request: Request, response: Response) {
        try {
            const ingressosComprados = await IngressoComprado.findAll();
            response.json(ingressosComprados);
        } catch (error) {
            responseError(error, response);
        }
    }

    async inserirCompraIngresso(request: Request, response: Response) {
        const transaction = await sequelize.transaction();

        try {
            const { idIngresso, idUsuario } = request.params;

            const options: CreateOptions = {
                transaction: transaction
            };

            const newTicket = await IngressoComprado.create({
                idUsuario: idUsuario.toString(),
                idIngresso: idIngresso.toString()
            }, options);

            transaction.commit();
            response.json(newTicket);
        } catch (error) {
            transaction.rollback();
            responseError(error, response);
        }
    }
}

export default new CompraIngressoController();