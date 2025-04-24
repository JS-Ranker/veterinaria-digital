import { Router } from 'express';
import {
  TraerDueno,
  CrearDueno,
  DesactivarDueno,
  ActivarDueno,
  updateDueno
} from '../controllers/duenos.controller.js';

const router = Router();

router.get('/', TraerDueno);
router.post('/', CrearDueno);
router.put('/:id/desactivar', DesactivarDueno);
router.put('/:id/activar', ActivarDueno);
router.put('/:id', updateDueno);

export default router;
