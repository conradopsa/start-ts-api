import Usuario from '../models/usuario';
import { Request, Response } from 'express';
import { responseError, responseDeleted, responseNotFound } from '../utils/serviceResponse';
import { toBoolean } from '../utils/convert';

import app from '../app';
import { CreateOptions } from 'sequelize/types';
const sequelize = app.database.sequelize;

const USER_NOT_FOUND = "Usuário não encontrado";

function responseUserDeleted(response: Response, deletedUser?: any) {
    return responseDeleted(response, "Usuário deletado!", deletedUser)
}

class UsuarioController {

    async listUsuarios(request: Request, response: Response) {
        try {
            const users = await Usuario.findAll()

            response.json(users);
        } catch (error) {
            responseError(error, response);
        }
    }

    async getUsuario(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const { ingressosComprados } = request.query;

            const scopeUsuario = toBoolean(ingressosComprados?.toString()) ?
                Usuario.scope('withIngressos') : Usuario;

            const user = await scopeUsuario.findByPk(id);

            if (!user)
                throw new Error(USER_NOT_FOUND);

            response.json(user);
        } catch (error) {
            responseError(error, response);
        }
    }

    async postUsuario(request: Request, response: Response) {
        const transaction = await sequelize.transaction();

        try {
            const body = request.body;
            const options: CreateOptions = {
                transaction: transaction
            }

            const newUser = await Usuario.create(body, options)

            await transaction.commit();
            response.json(newUser);
        } catch (error) {
            await transaction.rollback();
            responseError(error, response);
        }
    }

    async putUsuario(request: Request, response: Response) {
        const transaction = await sequelize.transaction();

        try {
            const { id } = request.params;
            const body = request.body;

            const user = await Usuario.findByPk(id)

            if (!user)
                throw new Error(USER_NOT_FOUND);

            const newUser = await user.update(body);

            await transaction.commit();
            response.send(newUser);
        } catch (error) {
            await transaction.rollback();
            responseError(error, response);
        }
    }

    async deleteUsuario(request: Request, response: Response) {
        const transaction = await sequelize.transaction();

        try {
            const { id } = request.params;

            const user = await Usuario.findByPk(id);

            if (!user)
                throw new Error(USER_NOT_FOUND);

            const deletedUser = await user.destroy()

            await transaction.commit();
            responseUserDeleted(response, deletedUser);
        } catch (error) {
            responseError(error, response);
        }
    }
}

export default new UsuarioController();