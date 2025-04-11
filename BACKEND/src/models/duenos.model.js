const db = require('../config/db');

const Dueno = {
getAll: (callback) => {
    const query = 'SELECT id, nombre, email, telefono, fecha_registro, activo FROM duenos';
    db.query(query, callback);
},

create: (data, callback) => {
    const query = 'INSERT INTO duenos (nombre, email, telefono, password, fecha_registro, activo) VALUES (?, ?, ?, ?, NOW(), 1)';
    const values = [data.nombre, data.email, data.telefono, data.password];
    db.query(query, values, callback);
}
};

module.exports = Dueno;
