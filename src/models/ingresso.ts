import { Model, Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'
import IngressoComprado from './ingressoComprado';

export default class Ingresso extends Model {
    public id!: number;
    public valor!: number;
    public descricao!: string | null;
}

export const attributes: ModelAttributes = {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    valor: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING }
};

export const basicAttributes = ['valor', 'descricao'];

export function init(sequelize: Sequelize) {

    const initOptions: InitOptions = {
        sequelize: sequelize
    }

    Ingresso.init(attributes, initOptions);
}

export function associate() {
    Ingresso.hasOne(IngressoComprado, { foreignKey: 'idIngresso' });
}