import path, { resolve } from "path";
import { PathLike, Dirent } from "fs";
import { readdir } from "fs/promises";

export default class fileUtils {
    public static getNameWithoutExtension(fileName: string) {
        let splitBasename: string = path.basename(fileName)?.split('.')[0];

        return splitBasename;
    }

    public static async getFilesRecursive(dir: PathLike): Promise<any> {
        const dirents: Dirent[] = await readdir(dir, { withFileTypes: true });
        const files = await Promise.all(dirents.map((dirent: Dirent) => {
            const res = resolve(dir.toString(), dirent.name);
            return dirent.isDirectory() ? fileUtils.getFilesRecursive(res) : res;
        }));
        return Array.prototype.concat(...files);
    }
}