import { Router } from 'express';
import usuarioController from '../controller/usuarioController';

const router = Router();

router.get('/usuario', usuarioController.listUsuarios);
router.get('/usuario/:id', usuarioController.getUsuario);
router.post('/usuario', usuarioController.postUsuario);
router.put('/usuario/:id', usuarioController.putUsuario);
router.delete('/usuario/:id', usuarioController.deleteUsuario);

export default router;