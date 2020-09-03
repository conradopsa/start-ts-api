import { Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'
import IngressoComprado from './ingressoComprado';
import { SuperModel } from '.';

export default class Ingresso extends SuperModel {
    id!: number;
    valor!: number;
    descricao!: string | null;

    static basicAttributes = ['valor', 'descricao'];

    static initDefault(sequelize: Sequelize) {
        const attributes: ModelAttributes = {
            id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
            valor: { type: DataTypes.STRING, allowNull: false },
            descricao: { type: DataTypes.STRING }
        };

        const initOptions: InitOptions = {
            sequelize: sequelize
        }

        Ingresso.init(attributes, initOptions);
    }

    static associate() {
        Ingresso.hasOne(IngressoComprado, { foreignKey: 'idIngresso' });
    }
}