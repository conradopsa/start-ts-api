import { Model, Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'

export default class IngressoComprado extends Model {
    public cpfCliente!: number;
    public codigoIngresso!: number;
}

export const attributes: ModelAttributes = {
    cpfCliente: { type: DataTypes.BIGINT, references: { model: 'Usuario', key: 'cpf' } },
    codigoIngresso: { type: DataTypes.INTEGER, allowNull: false,  references: { model: 'Ingresso', key: 'codigo' } }
};

export function init(sequelize: Sequelize) {
        const initOptions: InitOptions = {
            sequelize: sequelize,
            freezeTableName: true
        }
    
        IngressoComprado.init(attributes, initOptions);
}