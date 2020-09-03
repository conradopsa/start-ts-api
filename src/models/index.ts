import { Model, Sequelize } from 'sequelize'
import path from 'path';
import { getRecursiveImports } from '../utils/autoImport';

export class SuperModel extends Model {
    static basicAttributes?: string[] | string[][];
    static associate = () => {};
    static initDefault = (sequelize: Sequelize) => {};    
}

async function getModels(): Promise<(typeof SuperModel)[]> {
    const CURRENT_DIR = path.dirname(__filename);

    return await getRecursiveImports(CURRENT_DIR);
}

export default getModels();