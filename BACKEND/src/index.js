
// Importa las dependencias necesarias
import express from 'express'; // Framework para construir la API
import cors from 'cors'; // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
import dotenv from 'dotenv'; // Carga las variables de entorno desde un archivo .env
import duenosRoutes from './routes/duenos.routes.js'; // Importa las rutas para los "dueños"

// Configura dotenv para cargar las variables de entorno
dotenv.config();

// Crea una instancia de la aplicación Express
const app = express();

// Habilita CORS para permitir solicitudes desde diferentes orígenes
app.use(cors());

// Configura Express para que pueda parsear solicitudes JSON
app.use(express.json());

// Usa las rutas relacionadas con "dueños" en la URL /api/duenos
app.use('/api/duenos', duenosRoutes);

// Ruta raíz que responde con un mensaje indicando que la API está funcionando
app.get('/', (req, res) => {
res.send('API de Clínica Veterinaria funcionando!');
});

// Define el puerto del servidor, tomando el valor desde las variables de entorno o por defecto 3000
const PORT = process.env.PORT || 3000;

// Inicia el servidor en el puerto definido y muestra un mensaje en la consola
app.listen(PORT, () => {
console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
