import { Options } from 'swagger-jsdoc';

export const swaggerOptions: Options = {
    definition: {
        openapi: "3.0.3",
        info: {
            version: "1.0.0",
            title: "Start Typescript API",
            description: "Projeto disponível em https://github.com/conradopsa/start-ts-api",
        }
    },
    apis: ["src/docs/**/*.yml"]
};