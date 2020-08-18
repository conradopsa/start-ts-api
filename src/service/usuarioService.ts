import Usuario from "../models/usuario";
import { Request, Response } from 'express';
import { responseSequelizeError } from "../utils/serviceResponse";

class UsuarioService {
    async getUsuario(request: Request, response: Response) {
        const { cpf } = request.params;

        await Usuario.findByPk(cpf).then(
            (user) => {
                response.json(user);
            })
            .catch((error: Error) =>
                responseSequelizeError(error, response));
    }

    async postUsuario(request: Request, response: Response) {
        const body = request.body;

        try {
            const newUser = await Usuario.create(body);
            response.json(newUser);
        }
        catch (error) {
            responseSequelizeError(error, response)
        }
    }
}

export default new UsuarioService();