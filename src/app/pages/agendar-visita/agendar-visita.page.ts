import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-agendar-visita',
  templateUrl: './agendar-visita.page.html',
  styleUrls: ['./agendar-visita.page.scss'],
  standalone: false
})
export class AgendarVisitaPage {
  form = {
    rutDueno: '',
    nombreMascota: '',
    tipoMascota: 'Perro',
    especialidad: '',
    fecha: '',
    hora: '',
  };

  constructor(
    private storageService: StorageService,
    private toastController: ToastController
  ) {}

  async guardar() {
    const { rutDueno, nombreMascota, tipoMascota, especialidad, fecha, hora } = this.form;

    // Validar que todos los campos estén completos
    if (!rutDueno.trim() || !nombreMascota.trim() || !tipoMascota || !especialidad || !fecha || !hora) {
      this.presentToast('Por favor, completa todos los campos.', 'warning');
      return;
    }

    // Obtener todas las citas almacenadas
    let citas = await this.storageService.get('citas') || [];

    // Verificar si ya hay una cita para el mismo rut, fecha y hora
    const existe = citas.some((cita: any) =>
      cita.rutDueno.toLowerCase() === rutDueno.toLowerCase() &&
      cita.fecha === fecha &&
      cita.hora === hora
    );

    if (existe) {
      this.presentToast('Ya tienes una visita agendada para esta fecha y hora.', 'danger');
      return;
    }

    // Crear nueva cita con id único
    const nuevaCita = { ...this.form, id: Date.now() };
    citas.push(nuevaCita);

    // Guardar todas las citas actualizadas
    await this.storageService.set('citas', citas);

    this.presentToast('Agendamiento guardado correctamente', 'success');

    // Resetear formulario
    this.form = {
      rutDueno: '',
      nombreMascota: '',
      tipoMascota: 'Perro',
      especialidad: '',
      fecha: '',
      hora: '',
    };
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }
}
