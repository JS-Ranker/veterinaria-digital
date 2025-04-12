import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private crearUsuarioUrl: string = 'https://www.s2-studio.cl/api_duoc/usuario/usuario_almacenar';
  private loginUrl: string = 'https://www.s2-studio.cl/api_duoc/usuario/usuario_login';
  private sedesUrl: string = 'https://www.s2-studio.cl/api_duoc/usuario/sedes_obtener';
  private modificarUsuarioUrl: string = 'https://www.s2-studio.cl/api_duoc/usuario/usuario_modificar'; 
  private marcarAsistenciaUrl: string = 'https://www.s2-studio.cl/api_duoc/usuario/marcar_asistencia';
  private obtenerAsistenciaUrl: string = 'https://www.s2-studio.cl/api_duoc/usuario/asistencia_obtener';

  constructor(private http: HttpClient) {}

  // Métodos existentes
  crearUsuario(data: any): Observable<any> {
    const objeto = {
      correo: data.correo,
      contrasena: data.contrasena,
      nombre: data.nombre,
      apellido: data.apellido,
      carrera: data.carrera
    };
    return this.http.post(this.crearUsuarioUrl, objeto);
  }

  login(correo: string, contrasena: string): Observable<any> {
    const objeto = { correo: correo, contrasena: contrasena };
    return this.http.post(this.loginUrl, objeto);
  }

  obtenerSedes(): Observable<any> {
    return this.http.get(this.sedesUrl);
  }

  modificarUsuario(data: any): Observable<any> {
    const objeto = {
      correo: data.correo,
      contrasena: data.contrasena,
      carrera: data.carrera
    };
    return this.http.patch(this.modificarUsuarioUrl, objeto);
  }

  // Métodos nuevos para asistencia
  marcarAsistencia(sigla: string, correo: string, fecha: string): Observable<any> {
    const data = { sigla, correo, fecha };
    return this.http.post(this.marcarAsistenciaUrl, data);
  }

  obtenerAsistencia(correo: string): Observable<any> {
    const url = `${this.obtenerAsistenciaUrl}?correo=${correo}`;
    return this.http.get(url);
  }
}
