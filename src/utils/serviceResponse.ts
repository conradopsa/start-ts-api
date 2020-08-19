import { Response } from 'express';
import { red } from 'chalk';

export function responseError(error: Error, response: Response) {
    const responseError: ResponseError = {
        error: {
            message: error.message,
            stack: error.stack
        }
    }
    response.status(500).json(responseError);

    console.error(red(error.stack));
}

export function responseDeleted(response: Response, message?: string, deletedObject?: any) {
    const responseDeleted: ResponseDeleted = {
        message: message || "Registro deletado!",
        deletedObject: deletedObject
    }
    response.status(200).json(responseDeleted);
}


export interface ErrorMessage {
    message: string,
    stack?: string
}

export interface ResponseError {
    error: ErrorMessage;
}

export interface ResponseSuccess {
    message: string;
}

export interface ResponseDeleted extends ResponseSuccess {
    deletedObject?: any;
}