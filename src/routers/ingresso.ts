import { Router } from 'express';
import ingressoController from '../controller/ingressoController';

const router = Router();

router.get('/ingresso', ingressoController.listarIngressosComprados);
router.post('/ingresso', ingressoController.inserirCompraIngresso);

export default router