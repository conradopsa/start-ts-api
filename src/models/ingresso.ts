import { Model, Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'


export default class Ingresso extends Model {
    public codigo!: number;
    public valor!: number;
    public descricao!: string | null;
}

export const attributes: ModelAttributes = {
    codigo: { type: DataTypes.INTEGER, primaryKey: true },
    valor: { type: DataTypes.STRING, allowNull: false },
    descricao: { type: DataTypes.STRING }
};

export function init(sequelize: Sequelize) {

    const initOptions: InitOptions = {
        sequelize: sequelize,
        freezeTableName: true
    }

    Ingresso.init(attributes, initOptions);
}