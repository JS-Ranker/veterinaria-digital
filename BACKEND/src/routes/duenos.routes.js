// src/routes/duenos.routes.js

// Importa el objeto 'Router' de Express para definir las rutas
import { Router } from 'express';

// Importa los controladores para manejar las solicitudes de los dueños
import { TraerDueno, CrearDueno, DesactivarDueno, ActivarDueno, updateDueno } from '../controllers/duenos.controller.js';

// Crea una nueva instancia de Router
const router = Router();

// Define la ruta GET para obtener todos los dueños
// Cuando se realiza una solicitud GET a /api/duenos, se ejecuta la función getDuenos
router.get('/', TraerDueno);

// Define la ruta POST para crear un nuevo dueño
// Cuando se realiza una solicitud POST a /api/duenos, se ejecuta la función createDueno
router.post('/', CrearDueno);

//Ruta para desactivar un dueño con el ID
router.put('/:id/desactivar', DesactivarDueno);

//Ruta para Activar un dueño con el ID
router.put('/:id/activar', ActivarDueno);

//Ruta para Modificar un dueño con el ID
router.put('/:id', updateDueno);

// Exporta el router para que pueda ser usado en otros archivos
export default router;
