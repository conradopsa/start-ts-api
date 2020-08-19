import { Router } from 'express';
import path from 'path';
import { getRecursiveImports } from '../utils/autoImport';

const routerExport = Router();

async function getRouters(): Promise<Router[]> {
    const CURRENT_DIR = path.dirname(__filename);

    return await getRecursiveImports(CURRENT_DIR);
}

getRouters().then(
    routers => routers.forEach(
        router => routerExport.use(router)
    )
)

export default routerExport;