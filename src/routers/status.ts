import { Router } from 'express';
import statusController from '../controller/statusController';

const router = Router();

router.get('/status', statusController.status);

export default router