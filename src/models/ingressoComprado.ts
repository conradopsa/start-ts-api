import { Model, Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'

export default class IngressoComprado extends Model {
    public cpfCliente!: number;
    public codigoIngresso!: number;
}

export const attributes: ModelAttributes = {
    cpfCliente: { type: DataTypes.BIGINT, references: { model: 'usuario', key: 'cpf' } },
    codigoIngresso: { type: DataTypes.INTEGER, allowNull: false,  references: { model: 'ingresso', key: 'codigo' } }
};

export function init(sequelize: Sequelize) {
        const initOptions: InitOptions = {
            sequelize: sequelize,
            tableName: 'ingresso_comprado'
        }
    
        IngressoComprado.init(attributes, initOptions);
}