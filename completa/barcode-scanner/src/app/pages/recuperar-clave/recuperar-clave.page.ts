import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
})
export class RecuperarClavePage {
  email: string = '';

  constructor(
    private storageService: StorageService,
    private alertController: AlertController
  ) {}

  async recuperarClave() {
    // Obtener todos los usuarios del storage
    const usuarios = await this.storageService.get('usuarios') || [];

    // Buscar el usuario que coincida con el correo ingresado
    const usuario = usuarios.find((u: any) => u.correo === this.email);

    if (usuario && usuario.contrasena) {
      this.mostrarAlerta('Contraseña recuperada', `Tu contraseña es: ${usuario.contrasena}`);
    } else {
      this.mostrarAlerta('Error', 'Correo no encontrado.');
    }
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
