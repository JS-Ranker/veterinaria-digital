// src/app/pages/register/register.page.ts

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone:false
})
export class RegisterPage {
  usuario = {
    nombre: '',
    correo: '',
    password: ''
  };

  constructor(private storageService: StorageService, private router: Router) {}

  async registrarUsuario() {
    if (this.usuario.nombre && this.usuario.correo && this.usuario.password) {
      // Obtener lista de usuarios registrados
      const usuarios = await this.storageService.get('usuarios') || [];
  
      // Verificar si el correo ya está registrado
      const existe = usuarios.find((u: any) => u.correo === this.usuario.correo);
      if (existe) {
        alert('Este correo ya está registrado');
        return;
      }
  
      // Agregar nuevo usuario
      usuarios.push(this.usuario);
      await this.storageService.set('usuarios', usuarios);
  
      // Guardar el usuario actual (para saber quién está logueado)
      await this.storageService.set('usuario_actual', this.usuario.correo);
  
      this.router.navigateByUrl('/perfil');
    } else {
      alert('Completa todos los campos');
    }
  }
  irABienvenido() {
    this.router.navigateByUrl('/bienvenida');
  }
  
}
