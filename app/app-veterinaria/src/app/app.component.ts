import { Component } from '@angular/core';
import { Platform } from '@ionic/angular'; // 👈 Agregado para detectar cuando la app esté lista
import { StorageService } from './services/storage.service'; // 👈 Agregado para acceder al storage
import { Router } from '@angular/router'; // 👈 Agregado para redireccionar

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/spam', icon: 'warning' },
  ];
  
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  
  constructor(
    private platform: Platform, // 👈 Inyectamos Platform
    private storageService: StorageService, // 👈 Inyectamos StorageService
    private router: Router // 👈 Inyectamos Router
  ) {
    this.initializeApp(); // 👈 Llamamos a la función para inicializar
  }

  async initializeApp() {
    await this.platform.ready(); // Esperamos que la app esté lista (importante en móviles)

    const usuarioGuardado = await this.storageService.get('usuario_actual'); // Buscamos el usuario

    if (usuarioGuardado && usuarioGuardado.rut) {
      console.log('Usuario logueado detectado, enviando a principal...');
      this.router.navigateByUrl('/principal'); // Redirigimos a principal
    } else {
      console.log('No hay usuario guardado, sigue en login.');
    }
  }
}
