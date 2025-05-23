import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.page.html',
  styleUrls: ['./especialidades.page.scss'],
  standalone: false
})
export class EspecialidadesPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    // Puedes agregar lógica de inicialización aquí si lo necesitas
  }

  goTo(especialidad: string) {
    this.router.navigate(['/especialidades', especialidad]);
  }
}
