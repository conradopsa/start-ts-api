import dotenv from 'dotenv';
import { Sequelize, Options } from 'sequelize';
import { highDebug } from '../utils/debugLevel';
import { greenBright, red } from 'chalk';
import { toBoolean } from '../utils/convert';

//Init .env
dotenv.config();

const { DB_MS, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, SQL_DEBUG } = process.env;
const { log, error } = console;

const URI = `${DB_MS}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export default class Database {

    public sequelize: Sequelize;

    constructor(){
        this.sequelize = new Sequelize(URI, <Options>{
            logging: toBoolean(SQL_DEBUG) ? log : false
        });
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
}





