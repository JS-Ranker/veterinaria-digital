import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone:false
})
export class HomePage {
  constructor(private router: Router) {}

  irAMarket() {
    this.router.navigate(['/market']);
  }

  irAEspecialidades() {
    this.router.navigate(['/especialidades']);
  }

  irAPerfil() {
    this.router.navigate(['/perfil']);
  }

  irAAdoptame() {
    this.router.navigate(['/adopcion']);
  }
}
