import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import duenosRoutes from './routes/duenos.routes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: '*', // Permite todas las solicitudes 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true,             // Asegúrate de que CORS maneje correctamente las preflight requests
  optionsSuccessStatus: 200           // Para evitar un error en el preflight (algunos navegadores como IE11)
}));


app.use(express.json());

app.use('/api/duenos', duenosRoutes);

app.get('/', (req, res) => {
  res.send('API de Clínica Veterinaria funcionando!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
});
