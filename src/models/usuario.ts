import { Model, Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'


export default class Usuario extends Model {
    public cpf!: number;
    public email!: string;
    public nomeCompleto!: string;
    public senha!: string;
    public dataNascimento!: Date;
}

export const attributes: ModelAttributes = {
    cpf: { type: DataTypes.BIGINT, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false },
    nomeCompleto: { type: DataTypes.STRING, allowNull: false },
    senha: { type: DataTypes.STRING, allowNull: false },
    dataNascimento: { type: DataTypes.DATEONLY, allowNull: false }
};

export function init(sequelize: Sequelize) {
    const initOptions: InitOptions = {
        sequelize: sequelize,
        freezeTableName: true
    }

    Usuario.init(attributes, initOptions);
}