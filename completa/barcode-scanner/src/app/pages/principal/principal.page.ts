import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { NavController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})

export class PrincipalPage implements OnInit {
  usuario: any;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private navController: NavController,
    private dbService: DbService,
    private apiService: ApiService 
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.usuario = navigation?.extras?.state?.['usuario'];
  }

  ngOnInit() {
    console.log('Usuario en PrincipalPage:', this.usuario);
  }

  navegarAModificarUsuario() {
    console.log('Navegando a Modificar Usuario con usuario:', this.usuario);
    this.navController.navigateRoot('/modificar-usuario', {
      state: {
        usuario: this.usuario // Envía el objeto usuario
      }
    });
  }
}
