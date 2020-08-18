export function generateResponseError(error: Error): ResponseError {
    return {
        error: {
            message: error.message,
            stack: error.stack
        }
    }
}

export interface ErrorMessage {
    message: string,
    stack?: string
}

export interface ResponseError {
    error: ErrorMessage;
}