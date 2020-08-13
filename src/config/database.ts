import dotenv from 'dotenv';
import { Sequelize, Options } from 'sequelize';
import { highDebug } from '../utils/debugLevel';
import { greenBright, red } from 'chalk';
import { toBoolean } from '../utils/convert';


import { models, ModelModule } from '../models';


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
            logging: this.sqlDebug,
            freezeTableName: true
        });

        this.initModels();
    }

    public async connect() {
        highDebug(`[Sequelize] URI do banco = ${URI}`);
        log(`[Sequelize] Conectando-se ao banco de dados. . .`);

        //Testing connection. . .
        try {
            await this.sequelize.authenticate();
            log(`${greenBright('[Sequelize] Conexão realizada com sucesso!')}`);
        } catch (exception) {
            error(`${red('[Sequelize] Erro ao conectar-se ao banco de dados: ')}`);
            error(`${red(exception)}`);
        }
    };

    public async sync() {
        log(`[Sequelize] Sincronizando Banco de Dados`);

        try {
            await this.sequelize.sync({ logging: this.sqlDebug });
            log(`${greenBright('[Sequelize] Banco de Dados criado!')}`);
        } catch (exception) {
            error(`${red('[Sequelize] Erro ao criar o Banco de Dados')}`);
            error(`${red(exception)}`);
        }
    };

    private async initModels() {
        models.then((models) => {
            models.forEach((model) => {
                model.init(this.sequelize);                
            })
        })
    }
}





