import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import duenosRoutes from './routes/duenos.routes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/duenos', duenosRoutes);

app.get('/', (req, res) => {
  res.send('API de Clínica Veterinaria funcionando!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en http://0.0.0.0:${PORT}`);
});
