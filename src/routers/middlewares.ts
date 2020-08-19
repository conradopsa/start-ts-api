import { Router } from 'express';
import bodyParser from 'body-parser';
import { allowCORS } from '../middleware/allowCORS';

const router = Router();

//To use JSON in Body
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//TEMPORARY
router.use(allowCORS);

export default router;