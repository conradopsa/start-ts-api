import { Router, urlencoded, json } from 'express';
import { allowCORS } from '../middleware/allowCORS';

const router = Router();

//To use JSON in Body
router.use(urlencoded({ extended: true }));
router.use(json());

//TEMPORARY
router.use(allowCORS);

export default router;