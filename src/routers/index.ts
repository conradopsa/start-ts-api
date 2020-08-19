import { Router } from 'express';

import status from './status';
import usuario from './usuario';

const router = Router();

router.use(status);
router.use(usuario);

export default router;