// src/controllers/duenos.controller.js

// Importa el modelo 'Dueno' que maneja la lógica para interactuar con la base de datos
import Dueno from '../models/duenos.model.js';

// ver a los Dueños
export const TraerDueno = (req, res) => {
  Dueno.traer((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener dueños' });
    }
    res.json(results);
  });
};

// Crear un Dueño
export const CrearDueno = (req, res) => {
  const { nombre, email, telefono, password } = req.body;

  // Validación de campos requeridos
  if (!nombre || !email || !telefono || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  Dueno.crear({ nombre, email, telefono, password }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear dueño', detalle: err });
    }
    res.status(201).json({ mensaje: 'Dueño creado correctamente', id: result.insertId });
  });
};

//Desactivar un dueño
export const DesactivarDueno = (req, res) => {
  const { id } = req.params;

  Dueno.desactivar(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al desactivar el dueño', detalle: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Dueño no encontrado' });
    }
    res.status(200).json({ mensaje: 'Dueño desactivado correctamente' });
  });
};

//Activar Dueño
export const ActivarDueno = (req, res) => {
  const { id } = req.params;

  Dueno.activar(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al activar el dueño', detalle: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Dueño no encontrado' });
    }
    res.status(200).json({ mensaje: 'Dueño activado correctamente' });
  });
};

//Modificar Dueño

export const updateDueno = (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, password } = req.body;

  if (!nombre || !email || !telefono || !password) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  Dueno.update(id, { nombre, email, telefono, password }, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar dueño', detalle: err });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Dueño no encontrado' });
    }

    res.status(200).json({ mensaje: 'Dueño actualizado correctamente' });
  });
};
