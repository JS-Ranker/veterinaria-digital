import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
  standalone: false
})
export class RecuperarPasswordPage {
  correo: string = '';
  nuevaPassword: string = '';

  constructor(
    private storageService: StorageService,
    private toastController: ToastController,private router: Router,
    private navCtrl: NavController
  ) {}

  async actualizarPassword() {
    if (!this.correo || !this.nuevaPassword) {
      this.mostrarMensaje('Por favor ingresa tu correo y nueva contraseña');
      return;
    }

    const usuario = await this.storageService.getUsuario(this.correo);
    if (!usuario) {
      this.mostrarMensaje('Correo no encontrado');
      return;
    }

    // Actualizamos la contraseña del usuario
    usuario.password = this.nuevaPassword;
    await this.storageService.actualizarUsuario(this.correo, usuario);
    this.mostrarMensaje('Contraseña actualizada correctamente');
    this.navCtrl.navigateRoot('/login'); // Redirige al login después de actualizar
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
  irABienvenido() {
    this.router.navigateByUrl('/bienvenida');
  }
}
