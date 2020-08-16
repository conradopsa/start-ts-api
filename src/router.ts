import { Router } from 'express';
import bodyParser from 'body-parser';

import statusService from './service/statusService';

import usuariosService from './service/usuariosService';


const router = Router();

//To use JSON in Body
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//Allow CORS to all websites (TEMPORARY) 
router.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');

    if (req.method === 'OPTIONS')
        return res.sendStatus(200);
    else
        return next();
});

router.use('/status', statusService.status);

router.use('/usuarios', usuariosService.listUsuarios);

export default router;