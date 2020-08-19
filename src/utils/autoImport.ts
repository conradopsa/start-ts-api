import FileUtils from './fileUtils';

export async function getRecursiveImports(dir: string): Promise<any[]> {
    const { getFilesRecursive } = FileUtils;

    let requirePromise = await getFilesRecursive(dir).then(
        (files) => getRequires(files)
    );

    return requirePromise;
}

function getRequires(files: string[]): any[] {
    const { getNameWithoutExtension } = FileUtils;

    return files
        .map((file) => {
            if (getNameWithoutExtension(file) !== 'index')
                return require(file).default
        })
        .filter((require) => require != null);
}