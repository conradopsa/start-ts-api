import { Model, Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'
import Usuario from './usuario';
import Ingresso from './ingresso';

export default class IngressoComprado extends Model {
    public id!: number;
    public idUsuario!: number;
    public idIngresso!: number;
}

export const attributes: ModelAttributes = {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    idUsuario: { type: DataTypes.BIGINT, references: { model: 'Usuario', key: 'id' } },
    idIngresso: { type: DataTypes.INTEGER, allowNull: false,  references: { model: 'Ingresso', key: 'id' } }
};

export const basicAttributes = ['createdAt'];

export function init(sequelize: Sequelize) {
        const initOptions: InitOptions = {
            sequelize: sequelize
        }
    
        IngressoComprado.init(attributes, initOptions);
}

export function associate() {
    IngressoComprado.belongsTo(Usuario, { foreignKey: 'idUsuario' });
    IngressoComprado.belongsTo(Ingresso, { foreignKey: 'idIngresso' });
}