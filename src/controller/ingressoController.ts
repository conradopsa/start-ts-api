import Ingresso from '../models/ingresso';

import { Request, Response } from 'express';
import { responseError, responseNotFound } from '../utils/serviceResponse';

import app from '../app';
import { CreateOptions } from 'sequelize/types';
const sequelize = app.database.sequelize;

const TICKET_NOT_FOUND = "Ingressos não encontrados";

class CompraIngressoController {
    async listarIngressosComprados(request: Request, response: Response) {
        try {
            const ingresso = await Ingresso.findAll();
            response.json(ingresso);
        } catch (error) {
            responseError(error, response);
        }
    }

    async inserirCompraIngresso(request: Request, response: Response) {
        const transaction = await sequelize.transaction();

        try {
            const { body } = request;

            const newTicket = await Ingresso.create(body, { transaction: transaction });

            transaction.commit();
            response.json(newTicket);
        } catch (error) {
            transaction.rollback();
            responseError(error, response);
        }
    }
}

export default new CompraIngressoController();