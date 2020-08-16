import dotenv from 'dotenv';
import { Sequelize, Options } from 'sequelize';
import { highDebug } from '../utils/debugLevel';
import { red, whiteBright } from 'chalk';
import { toBoolean } from '../utils/convert';

import { models } from '../models';

//Init .env
dotenv.config();

const { DB_MS, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, SQL_DEBUG } = process.env;
const { log, error } = console;

const URI = `${DB_MS}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export default class Database {

    public sequelize: Sequelize;

    private sqlDebug: boolean | (() => void);

    constructor() {
        this.sqlDebug = toBoolean(SQL_DEBUG) ? log : false

        this.sequelize = new Sequelize(URI, <Options>{
            logging: this.sqlDebug
        });

        this.initModels();
    }

    public async connect(synchronize: boolean = true) {
        highDebug(`[Sequelize] URI do banco = ${URI}`);
        log(`[Sequelize] Conectando-se. . .`);

        
        try {
            //Testing connection. . .
            await this.sequelize.authenticate();
            log(`${whiteBright('[Sequelize] Conexão realizada com sucesso!')}`);

            if (synchronize)
                await this.sync(true);

        } catch (exception) {
            error(`${red('[Sequelize] Erro ao conectar-se ao banco de dados: ')}`);
            error(`${red(exception)}`);
        }
    };

    private async sync(force = false) {
        log('[Sequelize] Sincronizando. . .');
        try {
            const syncOptions = { logging: this.sqlDebug, force: force }
            highDebug(`[Sequelize] syncOptions = \n${JSON.stringify(syncOptions)}!`);
            await this.sequelize.sync(syncOptions);

            log(`${whiteBright('[Sequelize] Sincronizado!')}`);
        } catch (exception) {
            error(`${red('[Sequelize] Erro ao sincronizar o Banco de Dados')}`);
            error(`${red(exception)}`);
        }
    };

    private async initModels() {
        await models.then((models) => {
            models.forEach((model) => {
                model.init(this.sequelize);
            })
        })

        highDebug("Models iniciadas!");
    }
}





