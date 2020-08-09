import dotenv from 'dotenv';
import { toBoolean } from './convert'


//Init .env
dotenv.config();

const { HIGH_DEBUG } = process.env;

export function highDebug (message?: any, ...optionalParams: any[]) {
    return toBoolean(HIGH_DEBUG) === true && console.log(message, ...optionalParams)
}

export function lowerDebug (message?: any, ...optionalParams: any[]) {
    return console.log(message, ...optionalParams)
}