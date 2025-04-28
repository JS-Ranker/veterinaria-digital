import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { ApiService } from 'src/app/services/api.service';
import { AlertController } from '@ionic/angular'; // Agregado

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  usuario: any = {};
  mascotas: any[] = [];

  // Variables de control de edición
  editarNombre = false;
  editarApellido = false;
  editarTelefono = false;
  mostrarPassword = false;
  repetirPassword = '';

  constructor(
    private storageService: StorageService,
    private apiService: ApiService,
    private router: Router,
    private alertController: AlertController // Agregado
  ) {}

  async ngOnInit() {
    const userData = await this.storageService.get('usuario_actual');
    if (userData) {
      this.usuario = userData;
      this.cargarPerfil();
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  async cargarPerfil() {
    try {
      this.apiService.obtenerDuenos().subscribe((duenos: any[]) => {
        if (duenos) {
          const encontrado = duenos.find((u: any) => u.rut === this.usuario.rut);
          if (encontrado) {
            this.usuario = encontrado;
            console.log('Usuario encontrado:', this.usuario);
          } else {
            console.log('Usuario no encontrado');
          }
        } else {
          console.log('No se recibieron dueños desde la API');
        }
      });

      this.mascotas = await this.storageService.get(`mascotas_${this.usuario.rut}`) || [];
      console.log('Mascotas cargadas:', this.mascotas);

    } catch (error) {
      console.error('Error cargando perfil:', error);
    }
  }

  volverAPrincipal() {
    this.router.navigateByUrl('/principal');
  }

  async confirmarActualizarPerfil() {
    if (this.usuario.password !== this.repetirPassword) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Está seguro que quiere actualizar su perfil?',
      buttons: [
        {
          text: 'No',
          role: 'cancel'
        },
        {
          text: 'Sí',
          handler: () => {
            this.actualizarPerfil();
          }
        }
      ]
    });

    await alert.present();
  }

  async actualizarPerfil() {
    const updatedUser = {
      rut: this.usuario.rut,
      nombre: this.usuario.nombre,
      apellido: this.usuario.apellido,
      email: this.usuario.email,
      telefono: this.usuario.telefono,
      password: this.usuario.password
    };

    this.apiService.actualizarDueno(this.usuario.rut, updatedUser).subscribe(
      async (response) => {
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Datos actualizados correctamente.',
          buttons: ['OK']
        });
        await alert.present();
      },
      async (error) => {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error al actualizar perfil.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  irAMascotas() {
    this.router.navigateByUrl('/mascota-form');
  }

  async eliminarMascota(mascota: any) {
    const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar a ${mascota.nombre}?`);
    if (confirmDelete) {
      this.mascotas = this.mascotas.filter(m => m !== mascota);
      await this.storageService.set(`mascotas_${this.usuario.rut}`, this.mascotas);
      this.cargarPerfil();
    }
  }

  verHistorialMascota(mascota: any) {
    this.router.navigate(['/historial-medico'], { state: { mascota } });
  }

  confirmarCerrarSesion() {
    const confirmLogout = confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmLogout) {
      this.cerrarSesion();
    }
  }

  async cerrarSesion() {
    await this.storageService.remove('usuario_actual');
    this.router.navigateByUrl('/login');
  }
}
