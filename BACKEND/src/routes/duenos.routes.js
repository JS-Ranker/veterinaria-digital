import express from 'express';
import {
    loginDueno,
    TraerDuenos,
    CrearDueno,
    ActualizarDueno,
    DesactivarDueno,
    activarDueno,
    TraerDuenoPorRut
  } from '../controllers/duenos.controller.js';
   

const router = express.Router();

router.get('/', TraerDuenos);
router.post('/', CrearDueno);
router.put('/:rut', ActualizarDueno);
router.put('/desactivar/:rut', DesactivarDueno);
router.put('/activar/:rut', activarDueno);
router.get('/:rut', TraerDuenoPorRut);

router.post('/login', loginDueno);

export default router;
 