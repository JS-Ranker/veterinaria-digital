import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://192.168.1.13:3000'; 

  constructor(private http: HttpClient) { }

// Método para registrar un nuevo dueño
registrarDueno(datos: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/api/duenos`, datos);
}


  // Obtener todos los dueños
  obtenerDuenos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/duenos`);
  }

  // Actualizar información de un dueño
  actualizarDueno(rut: string, dueno: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/duenos/${rut}`, dueno);
  }

  // Desactivar un dueño
  desactivarDueno(rut: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/duenos/${rut}/desactivar`, {});
  }

  // Activar un dueño
  activarDueno(rut: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/api/duenos/${rut}/activar`, {});
  }

  // Método para login de un dueño
  login(rut: string, password: string): Observable<any> {
    const credentials = { rut, password };
    return this.http.post(`${this.apiUrl}/api/duenos/login`, credentials);
  }

  traerDuenoPorRut(rut: string) {
    return this.http.get<any>(`${this.apiUrl}/api/duenos/${rut}`);
  }
  
}
