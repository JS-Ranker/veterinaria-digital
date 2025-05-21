import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  usuario: any = null;
  mascotas: any[] = [];

  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit() {
    this.cargarPerfil();
  }

  // Cargar el perfil y las mascotas
  async cargarPerfil() {
    const correo = await this.storageService.get('usuario_actual');
    if (correo) {
      const usuarios = await this.storageService.get('usuarios') || [];
      this.usuario = usuarios.find((u: any) => u.correo === correo);
      this.mascotas = await this.storageService.get(`mascotas_${correo}`) || [];
    }
  }

  // Redirigir al formulario de mascotas para agregar una nueva
  irAMascotas() {
    this.router.navigateByUrl('/mascota-form');
  }

  // Editar una mascota
  editarMascota(mascota: any) {
    this.router.navigate(['/mascota-form'], {
      state: { mascota: mascota } // Pasamos los datos de la mascota a editar
    });
  }

  // Eliminar una mascota
  async eliminarMascota(mascota: any) {
    const confirmDelete = confirm(`¿Estás seguro de que deseas eliminar a ${mascota.nombre}?`);
    if (confirmDelete) {
      this.mascotas = this.mascotas.filter(m => m !== mascota);
      await this.storageService.set(`mascotas_${this.usuario.correo}`, this.mascotas);
      this.cargarPerfil(); // Recargar las mascotas después de eliminar
    }
  }

  // Ver historial médico
  verHistorialMascota(mascota: any) {
    this.router.navigate(['/historial-medico'], { state: { mascota } });
  }

  irABienvenido() {
    this.router.navigateByUrl('/bienvenida');
  }

  // Confirmar antes de cerrar sesión
  confirmarCerrarSesion() {
    const confirmLogout = confirm('¿Estás seguro de que deseas cerrar sesión?');
    if (confirmLogout) {
      this.cerrarSesion();
    }
  }

  // Cerrar sesión
  async cerrarSesion() {
    await this.storageService.remove('usuario_actual');
    this.router.navigateByUrl('/login');
  }
}
