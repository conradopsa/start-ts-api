import { Router } from 'express';
import bodyParser from 'body-parser';

import statusService from './service/statusService';

import usuariosService from './service/usuariosService';

import { allowCORS } from './middleware/allowCORS';


const router = Router();

//To use JSON in Body
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//TEMPORARY
router.use(allowCORS);

router.use('/status', statusService.status);

router.use('/usuarios', usuariosService.listUsuarios);

export default router;