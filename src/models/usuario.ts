import { Sequelize, ModelAttributes, InitOptions, DataTypes } from 'sequelize'
import IngressoComprado from './ingressoComprado';
import Ingresso from './ingresso';
import { SuperModel } from '.';

export default class Usuario extends SuperModel {
    id!: number;
    cpf!: number;
    email!: string;
    nomeCompleto!: string;
    senha!: string;
    dataNascimento!: Date;

    static basicAttributes = ['id', 'cpf', 'email', 'nomeCompleto', 'dataNascimento'];

    static initDefault(sequelize: Sequelize) {
        const attributes: ModelAttributes = {
            id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
            cpf: { type: DataTypes.BIGINT, unique: true },
            email: { type: DataTypes.STRING, allowNull: false, unique: true },
            nomeCompleto: { type: DataTypes.STRING, allowNull: false },
            senha: { type: DataTypes.STRING, allowNull: false },
            dataNascimento: { type: DataTypes.DATEONLY, allowNull: false }
        };
    
        const initOptions: InitOptions = {
            sequelize: sequelize,
            defaultScope: {
                attributes: Usuario.basicAttributes
            },
            scopes: {
                withIngressos: {
                    //@ts-ignore
                    include: {
                        model: IngressoComprado,
                        as: 'IngressosComprados',
                        attributes: IngressoComprado.basicAttributes,
                        include: [{
                            model: Ingresso,
                            attributes: Ingresso.basicAttributes
                        }]
                    },
                    attributes: Usuario.basicAttributes
                }
            }
        }
    
        Usuario.init(attributes, initOptions);
    }

    static associate() {
        Usuario.hasMany(IngressoComprado, { foreignKey: 'idUsuario', as: 'IngressosComprados' });
    }
}