// src/app/pages/mascota-form/mascota-form.page.ts

import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.page.html',
  styleUrls: ['./mascota-form.page.scss'],
  standalone: false
})
export class MascotaFormPage implements OnInit {
  mascota = {
    nombre: '',
    tipo: '',
    edad: null
  };

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}
  
  

  ngOnInit() {}
  

  async guardarMascota() {
    const correo = await this.storageService.get('usuario_actual');
  
    if (correo) {
      await this.storageService.saveOrUpdateMascota(correo, this.mascota);
  
      // Redirigir a la página historial-medico después de guardar
      this.router.navigate(['/historial-medico']);
    } else {
      alert('No se ha encontrado el usuario actual');
    }
  }

  irABienvenido() {
    this.router.navigateByUrl('/bienvenida');
  }
  
}
