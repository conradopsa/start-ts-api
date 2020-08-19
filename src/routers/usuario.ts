import { Router } from 'express';
import usuariosController from '../controller/usuariosController';
import usuarioController from '../controller/usuarioController';

const router = Router();

router.get('/usuarios', usuariosController.listUsuarios);
router.get('/usuario/:id', usuarioController.getUsuario);
router.post('/usuario', usuarioController.postUsuario);
router.put('/usuario/:id', usuarioController.putUsuario);
router.delete('/usuario/:id', usuarioController.deleteUsuario);

export default router;