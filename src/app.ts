import Database from './config/database'

const database = new Database();

console.log("teste");
database.connect();

database.sync();