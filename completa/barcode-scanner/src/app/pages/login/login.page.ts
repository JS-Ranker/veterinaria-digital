import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

// Decorador del componente que define el selector, plantilla y estilos
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html', // Archivo HTML asociado
  styleUrls: ['./login.page.scss'], // Archivo de estilos asociado
  standalone: false // Este componente no es standalone, usa NgModules
})
export class LoginPage implements OnInit {
  // Variables para almacenar datos del formulario
  mdl_correo: string = ''; // Correo electrónico ingresado
  mdl_contrasena: string = ''; // Contraseña ingresada
  mdl_mensaje: string = ''; // Mensaje de error o aviso para el usuario

  // Inyección de dependencias: Router, servicio API, base de datos local
  constructor(
    private router: Router,
    private apiService: ApiService,
    private db: DbService
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {}

  // Redirige a la página para crear un nuevo usuario
  irCrearUsuario() {
    this.router.navigate(['crear-usuario']);
  }

  // Método principal para iniciar sesión
  async login() {
    this.mdl_mensaje = ''; // Limpiar mensaje anterior

    // Validar que ambos campos estén llenos
    if (!this.mdl_correo || !this.mdl_contrasena) {
      this.mdl_mensaje = 'Todos los campos son obligatorios.';
      this.autoHideMessage(); // Ocultar mensaje después de un tiempo
      return;
    }

    // Mostrar los datos ingresados por consola (solo para pruebas)
    console.log('Datos enviados:', { correo: this.mdl_correo, contrasena: this.mdl_contrasena });

    try {
      // Llamar al servicio de login (API externa)
      const response = await this.apiService.login(this.mdl_correo, this.mdl_contrasena).toPromise();
      console.log('Respuesta de la API:', response); // Mostrar respuesta de la API

      // Si la respuesta es exitosa
      if (response.status === 'success') {
        const usuario = response.usuario; // Obtener usuario desde la respuesta

        // Guardar la sesión localmente
        await this.db.sesionAlmacenar(this.mdl_correo); // Guardar el correo como sesión activa

        // Redirigir a la página principal y enviar al usuario como estado
        this.router.navigate(['/principal'], { state: { usuario } });
      } else {
        // Si hubo un error en la autenticación
        this.mdl_mensaje = response.message || 'Error en el inicio de sesión.';
        this.autoHideMessage(); // Ocultar mensaje después de unos segundos
      }
    } catch (error) {
      // Manejar errores de conexión o servidor
      this.manejoError(error);
    }
  }

  // Método para manejar errores generales
  manejoError(error: any) {
    if (error.error && error.error.message) {
      this.mdl_mensaje = `Error: ${error.error.message}`; // Error específico del servidor
    } else {
      this.mdl_mensaje = `Error al iniciar sesión: ${error.message || 'Error desconocido'}`; // Error genérico
    }
    this.autoHideMessage(); // Ocultar mensaje automáticamente
  }

  // Método para ocultar el mensaje después de unos segundos
  autoHideMessage() {
    setTimeout(() => {
      this.mdl_mensaje = ''; // Limpia el mensaje después de 3 segundos
    }, 3000); // Tiempo de espera en milisegundos
  }
}
