const Dueno = require('../models/duenos.model');

const getDuenos = (req, res) => {
Dueno.getAll((err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener dueños' });
    res.json(results);
});
};

const createDueno = (req, res) => {
const { nombre, email, telefono, password } = req.body;
if (!nombre || !email || !telefono || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
}

Dueno.create({ nombre, email, telefono, password }, (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear dueño', detalle: err });
    res.status(201).json({ mensaje: 'Dueño creado correctamente', id: result.insertId });
});
};

module.exports = { getDuenos, createDueno };
