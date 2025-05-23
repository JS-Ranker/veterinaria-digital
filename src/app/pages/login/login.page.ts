import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone:false
})
export class LoginPage {
  usuario = {
    correo: '',
    password: ''
  };

  constructor(private storageService: StorageService, private router: Router) {}

  async login() {
    const usuarios = await this.storageService.get('usuarios') || [];
  
    const usuarioEncontrado = usuarios.find((u: any) =>
      u.correo === this.usuario.correo && u.password === this.usuario.password
    );
  
    if (usuarioEncontrado) {
      await this.storageService.set('usuario_actual', usuarioEncontrado.correo);
      this.router.navigateByUrl('/home');
    } else {
      alert('Credenciales incorrectas');
    }
  }

  // Redirige a la página de registro
  irARegistro() {
    this.router.navigateByUrl('/register');
  }

  // Redirige a la página de recuperación de contraseña
  irARecuperar() {
    this.router.navigateByUrl('/recuperar-password');
  }


  irABienvenido() {
    this.router.navigateByUrl('/bienvenida');
  }
  
}
