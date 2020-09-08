import Database from './config/database';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { green, red, whiteBright } from 'chalk';
import routers from './routers';
import middleware from './middleware';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { swaggerOptions } from './config/swagger';

//Init .env
dotenv.config();

const { log } = console;
const { SERVER_PORT } = process.env;

class App {
    readonly database: Database;
    readonly app: Express;

    constructor() {
        log(whiteBright("Iniciando a aplicação. . ."))

        this.database = new Database();
        this.app = express();

        this.start();
    }

    private async start() {
        try {
            await this.database.connect();

            this.app.use(middleware);

            this.app.use('/docs',
                swaggerUi.serve,
                swaggerUi.setup(
                    swaggerJSDoc(swaggerOptions)));

            this.app.use('/', routers);

            this.app.listen(SERVER_PORT, () => {
                log(`${whiteBright(`Documentação disponível em http://localhost:${SERVER_PORT}/docs`)}`)
                log(`${green(`Servidor Iniciado em http://localhost:${SERVER_PORT}/`)}`)
            });

        } catch (error) {
            console.error(red(error.stack));
        }
    }
}

export default new App();