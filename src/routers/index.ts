import { Router } from 'express';

import middlewares from './middlewares';
import status from './status';
import usuario from './usuario';

const router = Router();

router.use(middlewares);
router.use(status);
router.use(usuario);

export default router;