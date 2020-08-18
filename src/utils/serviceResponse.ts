import { Response } from 'express';
import { red } from 'chalk';

function generateSequelizeResponseError(error: Error): ResponseError {
    return {
        error: {
            message: error.message,
            stack: error.stack
        }
    }
}

export function responseSequelizeError(error: Error, response: Response) {
    const responseError: ResponseError = generateSequelizeResponseError(error);
    response.status(500).json(responseError);

    console.error(red(error.stack));
}

export interface ErrorMessage {
    message: string,
    stack?: string
}

export interface ResponseError {
    error: ErrorMessage;
}