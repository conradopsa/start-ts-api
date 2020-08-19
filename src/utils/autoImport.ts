import FileUtils from './fileUtils';

export async function getRecursiveImports(dir: string, importDefault: boolean = true): Promise<any[]> {
    const { getFilesRecursive } = FileUtils;

    let requirePromise = await getFilesRecursive(dir).then(
        (files) => getRequires(files, importDefault)
    );

    return requirePromise;
}

function getRequires(files: string[], importDefault: boolean): any[] {
    const { getNameWithoutExtension } = FileUtils;

    return files
        .map((file) => {
            if (getNameWithoutExtension(file) !== 'index')
                return importDefault ? require(file).default : require(file)
        })
        .filter((require) => require != null);
}