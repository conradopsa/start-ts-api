import { Model, Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'


export default class Ingresso extends Model {
    public codigo!: number;
    public valor!: number;
    public descricao!: string | null;
}

export const attributes: ModelAttributes = {
    codigo: { type: DataTypes.BIGINT, primaryKey: true },
    valor: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING }
};

export function init(sequelize: Sequelize) {

    const initOptions: InitOptions = {
        sequelize: sequelize
    }

    Ingresso.init(attributes, initOptions);
}