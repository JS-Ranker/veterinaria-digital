import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router: Router, private db: DbService) { }

  async ngOnInit() {
    console.log("Inicializando SplashPage...");

    await this.db.abrirDB();
    console.log("Base de datos abierta.");

    await this.db.crearTablaSesion();
    await this.db.crearTablaUsuario();
    await this.db.crearTablaAsistencias();  // Asegúrate de crear la tabla ASISTENCIAS

    // Definir los valores de los parámetros
    let codigoAsignatura = 'PGY4121';  // Ejemplo de código de asignatura
    let fecha = new Date().toISOString().split('T')[0];  // Obtener la fecha en formato YYYY-MM-DD

    // Registrar asistencia pasando los parámetros
    await this.db.registrarAsistencia(codigoAsignatura, fecha, true);  // Registrar asistencia como "presente"

    setTimeout(async () => {
      let cantidadSesion = await this.db.obtenerCantidadSesion();
      console.log('Cantidad de sesiones:', cantidadSesion);

      if (cantidadSesion === "0") {
        console.log("Navegando a login...");
        this.router.navigate(['login']);
      } else {
        console.log("Navegando a principal...");
        this.router.navigate(['principal']);
      }
    }, 2000);
  }
}
