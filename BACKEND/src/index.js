const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const duenosRoutes = require('./routes/duenos.routes');

app.use(cors());
app.use(express.json());

app.use('/api/duenos', duenosRoutes); // <- esta línea importa rutas

app.get('/', (req, res) => {
res.send('API de Clínica Veterinaria funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
