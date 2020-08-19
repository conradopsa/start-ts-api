import { Router } from 'express';
import bodyParser from 'body-parser';

import statusController from './controller/statusController';
import usuariosController from './controller/usuariosController';
import usuarioController from './controller/usuarioController';

import { allowCORS } from './middleware/allowCORS';

const router = Router();

//To use JSON in Body
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//TEMPORARY
router.use(allowCORS);

router.use('/status', statusController.status);

router.use('/usuarios', usuariosController.listUsuarios);

router.get('/usuario/:cpf', usuarioController.getUsuario);
router.post('/usuario', usuarioController.postUsuario);
router.put('/usuario/:cpf', usuarioController.putUsuario);
router.delete('/usuario/:cpf', usuarioController.deleteUsuario);

export default router;