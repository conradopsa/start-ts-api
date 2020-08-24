import { Model, Sequelize, ModelAttributes, InitOptions, DataTypes, ProjectionAlias } from 'sequelize'
import Usuario from './usuario';
import Ingresso, { basicAttributes as ingressoBasicAttributes } from './ingresso';

export default class IngressoComprado extends Model {
    public id!: number;
    public idUsuario!: number;
    public idIngresso!: number;
}

export const attributes: ModelAttributes = {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    idUsuario: { type: DataTypes.BIGINT, allowNull: true, references: { model: 'Usuario', key: 'id' } },
    idIngresso: { type: DataTypes.BIGINT, unique: true, allowNull: false, references: { model: 'Ingresso', key: 'id' } }
};

export const basicAttributes = [['createdAt', 'dataComprado']];

export function init(sequelize: Sequelize) {
    const initOptions: InitOptions = {
        sequelize: sequelize,
        defaultScope: {
            //@ts-ignore
            attributes: basicAttributes,
            include: {
                model: Ingresso,
                attributes: ingressoBasicAttributes
            }
        }
    }

    IngressoComprado.init(attributes, initOptions);
}

export function associate() {
    IngressoComprado.belongsTo(Usuario, { foreignKey: 'idUsuario' });
    IngressoComprado.belongsTo(Ingresso, { foreignKey: 'idIngresso' });
}