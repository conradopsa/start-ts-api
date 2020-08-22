# Start Typescript API

Olá, seja bem vindo! Esse projeto tem o objetivo de prover um código fonte base, bem estruturado, para desenvolver APIs REST que se comunicam com SGBDs relacionais (PostgreSQL, MySQL etc.).

## Tecnologias

Esse projeto utiliza:

**Node 14.6**: como ambiente de execução;

**Typescript 3.9**: como linguagem de programação;

**Express 4.17**: para fornecer as rotas e iniciar o servidor REST;

**Sequelize 6.3**: para definir, manipular e consultar o banco de dados;

**PostgreSQL 12**: como SGBD, podendo ser facilmente substituído por outro;
**Swagger 2**: para documentar as rotas;


## Getting Started
1. Clone e navegue até o projeto:
>$ git clone [https://github.com/conradopsa/start-ts-api](https://github.com/conradopsa/start-ts-api)
>$ cd start-ts-api
2. Instale as dependências
>$ npm install
3. Renomeie o arquivo .env-example para .env

4. Configure-o

5. Execute o servidor
>$ npm run watch
6. Faça um teste:
> http://localhost:5445/status

## Saiba mais

Para ajudar no desenvolvimento, o projeto já vem com 3 entidades relacionadas entre si e servindo um CRUD. Entidades essas: Usuario, Ingresso e IngressoComprado. Elas são apenas uma demonstração, um exemplo, portanto estão livres para serem apagadas, junto com seus serviços, em:
> src/controllers

> src/models

> stc/routers

## Comandos
Compila e executa, sempre que houver alterações no código:
> $ npm run watch
 
Apaga todos arquivos antigos no destino (src/build), compila e executa, sempre que houver alterações no código (mais demorado):
> $ npm run clear:watch

Observação: Esses dois são os principais comandos

---
Apaga todos arquivos antigos no destino:
> $ npm run clear

Apaga todos arquivos antigos no destino e compila:
> $ npm run clear:compile

Compila o código:
> $ npm run compile

## Arquitetura do projeto
Esse projeto está aderindo o padrão MVC, onde:
>**models** estão em src/models;

>**views** estão em src/routers

>**controllers** estão em src/controllers

Módulos extras
> *src/tasks* estão as tarefas

> *src/utils*  estão os utilitários

> *src/middleware* estão os middlewares

> *src/config* estão as configurações
