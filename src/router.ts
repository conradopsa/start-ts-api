import { Router } from 'express';
import bodyParser from 'body-parser';

import statusService from './service/statusService';
import usuariosService from './service/usuariosService';
import usuarioService from './service/usuarioService';

import { allowCORS } from './middleware/allowCORS';

const router = Router();

//To use JSON in Body
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//TEMPORARY
router.use(allowCORS);

router.use('/status', statusService.status);

router.use('/usuarios', usuariosService.listUsuarios);

router.get('/usuario/:cpf', usuarioService.getUsuario);
router.post('/usuario', usuarioService.postUsuario);
router.put('/usuario/:cpf', usuarioService.putUsuario);
router.delete('/usuario/:cpf', usuarioService.deleteUsuario);

export default router;