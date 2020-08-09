import { greenBright, red } from 'chalk';
import dotenv from 'dotenv';
import { Sequelize, Options } from 'sequelize';
import { highDebug } from './utils/debugLevel';

//Init .env
dotenv.config();

const { DB_MS, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
const { log, error } = console;
const URI = `${DB_MS}://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const sequelize = new Sequelize(URI, <Options>{logging: log});

connect();

async function connect() {
    highDebug(`URI do banco = ${URI}`);
    log(`[Sequelize] Conectando-se ao banco de dados. . .`);

    //Testing connection. . .
    try {        
        await sequelize.authenticate();
        log(`${greenBright('[Sequelize] Conexão realizada com sucesso!')}`);
    } catch (exception) {
        error(`${red('[Sequelize] Erro ao conectar-se ao banco de dados: ')}`);
        error(`${red(exception)}`);
    }
};