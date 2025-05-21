import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { NavController } from '@ionic/angular'; // 👈 Importación añadida

@Component({
  selector: 'app-historial-medico',
  templateUrl: './historial-medico.page.html',
  styleUrls: ['./historial-medico.page.scss'],
  standalone: false
})
export class HistorialMedicoPage implements OnInit {

  correo: string = '';
  mascotaNombre: string = '';
  nuevaEntrada: string = '';
  historial: string[] = [];

  constructor(
    private storageService: StorageService,
    private navCtrl: NavController // 👈 Inyección del NavController
  ) {}

  ngOnInit() {}

  async agregarEntrada() {
    if (!this.correo || !this.mascotaNombre || !this.nuevaEntrada) {
      alert('Por favor completa todos los campos');
      return;
    }

    await this.storageService.addHistorialItem(this.correo, this.mascotaNombre, this.nuevaEntrada);
    this.nuevaEntrada = '';
    this.verHistorial(); // Actualiza la lista después de agregar
  }

  async verHistorial() {
    if (!this.correo || !this.mascotaNombre) {
      alert('Debes ingresar el correo y nombre de la mascota');
      return;
    }

    const data = await this.storageService.getHistorial(this.correo, this.mascotaNombre);
    this.historial = data || [];
  }

  // ✅ Método para volver a la página de bienvenida
  volverAperfil() {
    this.navCtrl.navigateBack('/perfil');
  }
}
