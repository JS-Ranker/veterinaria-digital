import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private crearUsuarioUrl = 'https://www.s2-studio.cl/api_duoc/usuario/usuario_almacenar';
  private loginUrl = 'https://www.s2-studio.cl/api_duoc/usuario/usuario_login';
  private sedesUrl = 'https://www.s2-studio.cl/api_duoc/usuario/sedes_obtener';

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: { correo: string; contrasena: string; nombre: string; apellido: string; carrera: string; }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.crearUsuarioUrl, usuario, { headers });
  }

  login(correo: string, contrasena: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const objeto = { correo: correo, contrasena: contrasena };
    return this.http.post(this.loginUrl, objeto, { headers });
  }

  obtenerSedes(): Observable<any> {
    return this.http.get(this.sedesUrl);
  }
}
