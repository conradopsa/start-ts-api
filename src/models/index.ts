import { Model, Sequelize, ModelAttributes } from 'sequelize'
import path from 'path';
import { getRecursiveImports } from '../utils/autoImport';

export interface ModelModule {
    default: Model,
    attributes: ModelAttributes,
    init: ((sequelize: Sequelize) => void),
    associate: (() => void)
}

async function getModels(): Promise<ModelModule[]> {
    const CURRENT_DIR = path.dirname(__filename);

    return await getRecursiveImports(CURRENT_DIR, false);
}

export const models: Promise<ModelModule[]> = getModels();