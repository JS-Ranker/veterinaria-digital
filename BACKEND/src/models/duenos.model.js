import db from '../config/db.js';

const Dueno = {
  traer: (callback) => {
    const sql = `
      SELECT id, rut, nombre, apellido, email, telefono, password, fecha_registro, activo
      FROM duenos
      ORDER BY id ASC
    `;
    db.query(sql, callback);
  },

  crear: (datos, callback) => {
    const sql = `
      INSERT INTO duenos
        (rut, nombre, apellido, email, telefono, password, fecha_registro, activo)
      VALUES (?, ?, ?, ?, ?, ?, NOW(), 1)
    `;
    const params = [
      datos.rut,
      datos.nombre,
      datos.apellido,
      datos.email,
      datos.telefono,
      datos.password
    ];
    db.query(sql, params, callback);
  },

  update: (id, datos, callback) => {
    const sql = `
      UPDATE duenos
      SET
        rut = ?,
        nombre = ?,
        apellido = ?,
        email = ?,
        telefono = ?,
        password = ?
      WHERE id = ?
    `;
    const params = [
      datos.rut,
      datos.nombre,
      datos.apellido,
      datos.email,
      datos.telefono,
      datos.password,
      id
    ];
    db.query(sql, params, callback);
  },

  desactivar: (id, callback) => {
    const sql = `UPDATE duenos SET activo = 0 WHERE id = ?`;
    db.query(sql, [id], callback);
  },

  activar: (id, callback) => {
    const sql = `UPDATE duenos SET activo = 1 WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

export default Dueno;
