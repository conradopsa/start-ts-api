import { Model, Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'

import Usuario from './usuario';

export default class IngressoComprado extends Model {
    public cpfCliente!: number;
    public codigoIngresso!: number;
    public dataHora!: Date;
}

export const attributes: ModelAttributes = {
    cpfClienteFK: { type: DataTypes.BIGINT, references: { model: 'Usuario', key: 'cpf' } }
    //codigoIngresso: { type: DataTypes.INTEGER, allowNull: false }
};

export function init(sequelize: Sequelize) {

    const initOptions: InitOptions = {
        sequelize: sequelize
    }

    IngressoComprado.init(attributes, initOptions);
}