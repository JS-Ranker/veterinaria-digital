import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
  standalone: false,
})
export class PrincipalPage implements OnInit {
  username: string = 'Usuario';

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

  async ngOnInit() {
    // Obtener datos del usuario actual del almacenamiento
    const userData = await this.storageService.get('usuario_actual');
    if (userData) {
      this.username = userData.nombre || 'Usuario';
    } else {
      // Si no hay usuario en storage, redirigir al login
      this.router.navigateByUrl('/login');
    }
  }

  // Función para navegar al perfil
  irAPerfil() {
    this.router.navigateByUrl('/perfil');
  }
  
  // Función para navegar a cualquier ruta
  navigateTo(ruta: string) {
    this.router.navigateByUrl(ruta);
  }

  async logout() {
    await this.storageService.remove('usuario_actual');
    this.router.navigateByUrl('/login');
  }
} 