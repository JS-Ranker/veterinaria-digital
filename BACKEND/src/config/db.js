// src/config/db.js
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME
});

connection.connect((err) => {
if (err) {
    console.error('❌ Error al conectar con MySQL:', err.message);
    return;
}
console.log('✅ Conexión a MySQL establecida correctamente');
});

module.exports = connection;
