import { Model, Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'

export default class IngressoComprado extends Model {
    public idCliente!: number;
    public codigoIngresso!: number;
}

export const attributes: ModelAttributes = {
    idCliente: { type: DataTypes.BIGINT, references: { model: 'Usuario', key: 'id' } },
    idIngresso: { type: DataTypes.INTEGER, allowNull: false,  references: { model: 'Ingresso', key: 'id' } }
};

export function init(sequelize: Sequelize) {
        const initOptions: InitOptions = {
            sequelize: sequelize,
            freezeTableName: true
        }
    
        IngressoComprado.init(attributes, initOptions);
}