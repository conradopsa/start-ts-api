import { Model, Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'


class Usuario extends Model {
    public cpf!: number;
    public email!: string;
    public nomeCompleto!: string;
    public senha!: string;
    public dataNascimento!: Date;
}

export function init(sequelize: Sequelize) {
    let modelAttributes = <ModelAttributes>{
        cpf: { type: DataTypes.BIGINT, primaryKey: true },
        email: { type: DataTypes.STRING },
        nomeCompleto: { type: DataTypes.STRING },
        senha: { type: DataTypes.STRING },
        dataNascimento: { type: DataTypes.DATEONLY }
    };

    let initOptions = <InitOptions>{
        sequelize: sequelize
    }

    Usuario.init(modelAttributes, initOptions);
}