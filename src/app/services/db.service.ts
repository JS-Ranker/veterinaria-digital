import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private db: SQLiteObject | null = null;

  constructor(private sqlite: SQLite) { }

  async abrirDB() {
    if (!this.db) {
      this.db = await this.sqlite.create({
        name: "datos.db",
        location: "default"
      });
      console.log("RAP: Base de datos abierta ok");
    }
  }

  async crearTablaUsuario() {
    await this.abrirDB(); 
    await this.db?.executeSql("CREATE TABLE IF NOT EXISTS USUARIO(MAIL VARCHAR(75), PASS VARCHAR(30), NOMBRE VARCHAR(30), APELLIDO VARCHAR(30))", []);
    console.log("RAP: Tabla Usuario Creada ok");
  }

  async crearTablaSesion() {
    await this.abrirDB(); 
    await this.db?.executeSql("CREATE TABLE IF NOT EXISTS SESION(MAIL VARCHAR(75))", []);
    console.log("RAP: Tabla Sesion Creada ok");
  }

  // **Nuevo método para crear la tabla ASISTENCIAS**
  async crearTablaAsistencias() {
    await this.abrirDB();
    await this.db?.executeSql(`
      CREATE TABLE IF NOT EXISTS ASISTENCIAS (
        CODIGO_ASIGNATURA VARCHAR(10),
        FECHA VARCHAR(10),
        PRESENTE BOOLEAN
      )
    `, []);
    console.log("RAP: Tabla Asistencias Creada ok");
  }

  async usuarioAlmacenar(correo: string, contrasena: string, nombre: string, apellido: string) {
    await this.abrirDB();
    try {
      await this.db?.executeSql("INSERT INTO USUARIO VALUES(?,?,?,?)", [correo, contrasena, nombre, apellido]);
      console.log("RAP: Usuario Almacenado ok");
    } catch (error) {
      console.error("Error al almacenar usuario:", error);
    }
  }

  async obtenerCantidadSesion() {
    await this.abrirDB(); 
    try {
      let respuesta = await this.db?.executeSql("SELECT COUNT(MAIL) AS CANTIDAD FROM SESION", []);
      return respuesta.rows.length > 0 ? JSON.stringify(respuesta.rows.item(0).CANTIDAD) : "0";
    } catch (error) {
      console.error("Error al obtener cantidad de sesiones:", error);
      return "0"; // En caso de error, retornamos "0"
    }
  }

  async sesionAlmacenar(correo: string) {
    await this.abrirDB();
    try {
      await this.db?.executeSql("INSERT INTO SESION (MAIL) VALUES(?)", [correo]);
      console.log("RAP: Sesión Almacenada ok");
    } catch (error) {
      console.error("Error al almacenar sesión:", error);
    }
  }

  // **Nuevo método**: Verificar si ya existe una asistencia registrada
  async existeAsistencia(codigoAsignatura: string, fecha: string): Promise<boolean> {
    await this.abrirDB();
    try {
      const resultado = await this.db?.executeSql(`
        SELECT COUNT(*) AS CANTIDAD
        FROM ASISTENCIAS
        WHERE CODIGO_ASIGNATURA = ? AND FECHA = ?
      `, [codigoAsignatura, fecha]);

      if (resultado?.rows.length > 0) {
        return resultado.rows.item(0).CANTIDAD > 0;  // Retorna true si ya está registrada
      }
      return false;  // Si no está registrada, retorna false
    } catch (error) {
      console.error("Error al verificar si existe la asistencia:", error);
      return false;  // En caso de error, retornamos false
    }
  }

  // **Nuevo método**: Registrar asistencia
  async registrarAsistencia(codigoAsignatura: string, fecha: string, presente: boolean) {
    await this.abrirDB();
    try {
      await this.db?.executeSql("INSERT INTO ASISTENCIAS (CODIGO_ASIGNATURA, FECHA, PRESENTE) VALUES (?, ?, ?)", [codigoAsignatura, fecha, presente]);
      console.log("RAP: Asistencia registrada correctamente.");
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
    }
  }
}
