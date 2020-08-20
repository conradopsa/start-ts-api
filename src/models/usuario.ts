import { Model, Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'
import IngressoComprado from './ingressoComprado';

export default class Usuario extends Model {
    public id!: number;
    public cpf!: number;
    public email!: string;
    public nomeCompleto!: string;
    public senha!: string;
    public dataNascimento!: Date;
}

export const attributes: ModelAttributes = {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    cpf: { type: DataTypes.BIGINT, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    nomeCompleto: { type: DataTypes.STRING, allowNull: false },
    senha: { type: DataTypes.STRING, allowNull: false },
    dataNascimento: { type: DataTypes.DATEONLY, allowNull: false }
};

export function init(sequelize: Sequelize) {
    const initOptions: InitOptions = {
        sequelize: sequelize
    }

    Usuario.init(attributes, initOptions);
}

export function associate() {
    Usuario.hasMany(IngressoComprado, { foreignKey: 'idUsuario' });
}