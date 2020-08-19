import Database from './config/database';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import { green } from 'chalk';
import routers from './routers';

//Init .env
dotenv.config();

const { log } = console;
const { SERVER_PORT } = process.env;

class App {
    private _database: Database;
    private _app: Express;

    constructor() {
        this._database = new Database();
        this._app = express();
    }

    get database() {
        return this._database;
    }

    get app() {
        return this._app;
    }

    public async start() {
        await this.database.connect();

        //Import routers
        this.app.use('/', routers);

        this.app.listen(SERVER_PORT, () => {
            log(`${green(`Servidor Iniciado em http://localhost:${SERVER_PORT}/`)}`)
        });
    }
}

const app = new App();
app.start();

export default app;