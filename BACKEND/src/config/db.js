// Importa las dependencias necesarias
import mysql from 'mysql2'; // Paquete para interactuar con la base de datos MySQL
import dotenv from 'dotenv'; // Paquete para cargar las variables de entorno desde un archivo .env

// Configura dotenv para cargar las variables de entorno
dotenv.config();

// Crea la conexión a la base de datos MySQL usando las variables de entorno
const connection = mysql.createConnection({
  host: process.env.DB_HOST, // Dirección del servidor de base de datos
  user: process.env.DB_USER, // Nombre de usuario para la conexión
  password: process.env.DB_PASSWORD, // Contraseña para el usuario
  database: process.env.DB_NAME // Nombre de la base de datos
});

// Establece la conexión y maneja el resultado
connection.connect((err) => {
if (err) {
    // Si hay un error al conectar, se muestra un mensaje de error
    console.error('❌ Error al conectar con MySQL:', err.message);
    return;
}
  // Si la conexión es exitosa, se muestra un mensaje confirmando la conexión
console.log('✅ Conexión a MySQL establecida correctamente');
});

// Exporta la conexión para que pueda ser utilizada en otros archivos
export default connection;
