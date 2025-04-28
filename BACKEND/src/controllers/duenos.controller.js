import Dueno from '../models/duenos.model.js';

// Traer todos los dueños
export const TraerDuenos = (req, res) => {
  Dueno.traer((err, duenos) => {
    if (err) {
      return res.status(500).json({ error: 'Error al traer los dueños', detalle: err });
    }
    res.status(200).json(duenos);
  });
};

// Crear un dueño
export const CrearDueno = (req, res) => {
  const datos = req.body;

  Dueno.crear(datos, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al crear el dueño', detalle: err });
    }
    res.status(201).json({ mensaje: 'Dueño creado exitosamente', id: result.insertId });
  });
};

// Actualizar un dueño
export const ActualizarDueno = (req, res) => {
  const { rut } = req.params;
  const datos = req.body;

  Dueno.update(rut, datos, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al actualizar el dueño', detalle: err });
    }
    res.status(200).json({ mensaje: 'Dueño actualizado correctamente' });
  });
};

// Desactivar un dueño
export const DesactivarDueno = (req, res) => {
  const { rut } = req.params;

  Dueno.desactivar(rut, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error al desactivar el dueño', detalle: err });
    }
    res.status(200).json({ mensaje: 'Dueño desactivado' });
  });
};

// Activar un dueño

export const activarDueno = (req, res) => {
  const { rut } = req.params;

  Dueno.activar(rut, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error al activar al dueño', detalle: err });
    }
    res.status(200).json({ mensaje: 'Dueño activado exitosamente' });
  });
};


// Traer un dueño específico por rut
export const TraerDuenoPorRut = (req, res) => {
  const { rut } = req.params;

  Dueno.buscarDatosPorRut(rut, (err, dueno) => {
    if (err) {
      return res.status(500).json({ error: 'Error al buscar el dueño', detalle: err });
    }
    if (!dueno) {
      return res.status(404).json({ error: 'Dueño no encontrado' });
    }
    res.status(200).json(dueno);
  });


};


export const loginDueno = (req, res) => {
  const { rut, password } = req.body;

  Dueno.buscarPorRut(rut, (err, dueno) => {
    if (err) {
      return res.status(500).json({ error: 'Error en el servidor', detalle: err });
    }

    if (!dueno) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (dueno.password !== password) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    if (dueno.activo !== 1) {
      return res.status(403).json({ error: 'Usuario inactivo' });
    }

    res.status(200).json({ mensaje: 'Login exitoso', rut: dueno.rut });
  });
};

