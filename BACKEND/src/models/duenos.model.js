
// Importa la configuración de la base de datos desde el archivo 'db.js'
import db from '../config/db.js';

// Define el modelo 'Dueno' con métodos para interactuar con la base de datos
const Dueno = {

  update: (id, data, callback) => {
    const query = `
      UPDATE duenos 
      SET nombre = ?, email = ?, telefono = ?, password = ?
      WHERE id = ?
    `;
    const values = [data.nombre, data.email, data.telefono, data.password, id];
    db.query(query, values, callback);
  },
  



activar: (id,callback) => {
  const query = "UPDATE duenos SET activo = 1 WHERE id = ?";
  db.query(query,[id],callback)
},


desactivar: (id,callback) => {
  const query = "UPDATE duenos SET activo = 0 WHERE id = ?";
  db.query(query, [id], callback);
},


  // Método para obtener todos los dueños de la base de datos
traer: (callback) => {
    // Consulta SQL para seleccionar ciertos campos de la tabla 'duenos'
    const query = 'SELECT id, nombre, email, telefono, fecha_registro, activo FROM duenos';
    
    // Ejecuta la consulta y pasa los resultados al callback
    db.query(query, callback);
},

  // Método para crear un nuevo dueño en la base de datos
crear: (data, callback) => {
    // Consulta SQL para insertar un nuevo dueño en la tabla 'duenos'
    const query = `
    INSERT INTO duenos (nombre, email, telefono, password, fecha_registro, activo)
    VALUES (?, ?, ?, ?, NOW(), 1)
    `;
    
    // Arreglo con los valores que se insertarán en la base de datos
    const values = [data.nombre, data.email, data.telefono, data.password];
    
    // Ejecuta la consulta con los valores proporcionados y pasa el resultado al callback
    db.query(query, values, callback);
}



};

// Exporta el modelo 'Dueno' para que pueda ser utilizado en otros archivos
export default Dueno;
