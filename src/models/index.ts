import { Model, Sequelize, ModelAttributes } from 'sequelize'
import path from 'path';
import FileUtils from '../utils/fileUtils';

export interface ModelModule {
    default: Model,
    attributes: ModelAttributes,
    init: ((sequelize: Sequelize) => void)
}

export const models: Promise<ModelModule[]> = getModels();

async function getModels(): Promise<ModelModule[]> {
    const CURRENT_DIR = path.dirname(__filename);
    const { getFilesRecursive } = FileUtils;

    let filesPromise: Promise<string[]> = getFilesRecursive(CURRENT_DIR);

    return await filesPromise.then(
        (files) => getModelModules(files)
    );
}

function getModelModules(files: string[]): ModelModule[] {
    const { getNameWithoutExtension } = FileUtils;

    return <ModelModule[]>files
        .map((file) => {
            if (getNameWithoutExtension(file) !== 'index')
                return <ModelModule>require(file)
        })
        .filter((model) => model != null);;
}