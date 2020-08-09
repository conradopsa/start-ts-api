import dotenv from 'dotenv';

//Init .env
dotenv.config();

const { HIGH_DEBUG } = process.env;

export function highDebug (message?: any, ...optionalParams: any[]) {
    return HIGH_DEBUG?.toLowerCase() === 'true' && console.log(message, ...optionalParams)
}

export function lowerDebug (message?: any, ...optionalParams: any[]) {
    return console.log(message, ...optionalParams)
}