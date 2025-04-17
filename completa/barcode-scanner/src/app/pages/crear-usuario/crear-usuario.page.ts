import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
})
export class CrearUsuarioPage implements OnInit {
  usuarioForm: FormGroup = this.fb.group({});
  mensaje: string = '';

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private storageService: StorageService
  ) {
    this.inicializarFormulario();
  }

  ngOnInit() {}

  inicializarFormulario() {
    this.usuarioForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      carrera: ['', [Validators.required]],
    });
  }

  checkForm() {
    if (this.usuarioForm.invalid) {
      this.mensaje = 'Todos los campos son obligatorios.';
      return;
    }
    this.onSubmit();
  }

  async onSubmit() {
    this.mensaje = '';
    
    // Obtén todos los usuarios del storage
    const usuarios = await this.storageService.get('usuarios') || [];

    // Verifica si el correo ya existe
    const existeCorreo = usuarios.some((u: any) => u.correo === this.usuarioForm.value.correo);

    if (existeCorreo) {
      this.mensaje = 'El correo ingresado ya existe.';
      return;
    }

    // Agrega el nuevo usuario a la lista
    usuarios.push(this.usuarioForm.value);

    // Guarda la lista actualizada de usuarios
    await this.storageService.set('usuarios', usuarios);

    this.mensaje = 'Usuario creado correctamente.';
    this.usuarioForm.reset();
  }

  irALogin() {
    this.navCtrl.navigateForward('/login');
  }
}
