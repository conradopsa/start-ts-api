import { Sequelize, ModelAttributes, InitOptions, DataTypes, ProjectionAlias } from 'sequelize'
import Usuario from './usuario';
import Ingresso from './ingresso';
import { SuperModel } from '.';

export default class IngressoComprado extends SuperModel {
    id!: number;
    idUsuario!: number;
    idIngresso!: number;

    static basicAttributes = [['createdAt', 'dataComprado']];

    static initDefault(sequelize: Sequelize) {
        const attributes: ModelAttributes = {
            id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
            idUsuario: { type: DataTypes.BIGINT, allowNull: true, references: { model: 'Usuario', key: 'id' } },
            idIngresso: { type: DataTypes.BIGINT, unique: true, allowNull: false, references: { model: 'Ingresso', key: 'id' } }
        };
    
        const initOptions: InitOptions = {
            sequelize: sequelize,
            defaultScope: {
                //@ts-ignore
                attributes: IngressoComprado.basicAttributes,
                include: {
                    model: Ingresso,
                    attributes: Ingresso.basicAttributes
                }
            }
        }
        
        IngressoComprado.init(attributes, initOptions);
    }
    
    static associate() {
        IngressoComprado.belongsTo(Usuario, { foreignKey: 'idUsuario' });
        IngressoComprado.belongsTo(Ingresso, { foreignKey: 'idIngresso' });
    }
}