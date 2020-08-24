import { Router } from 'express';
import compraIngressoController from '../controller/compraIngressoController';

const router = Router();

router.post('/usuario/:idUsuario/compraIngresso/:idIngresso', compraIngressoController.inserirCompraIngresso);
router.get('/ingressosComprados', compraIngressoController.listarIngressosComprados);

export default router;