import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { NavController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.page.html',
  styleUrls: ['./modificar-usuario.page.scss'],
})
export class ModificarUsuarioPage implements OnInit {
  modificarForm: FormGroup;
  mensaje: string = '';
  usuario: any;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private navController: NavController,
    private dbService: DbService,
    private router: Router
  ) {
    // Inicializa el formulario con validaciones
    this.modificarForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required]],
      carrera: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    this.usuario = navigation?.extras?.state?.['usuario'];
    console.log('Usuario recibido en ModificarUsuarioPage:', this.usuario);

    if (this.usuario) {
      this.modificarForm.patchValue({
        correo: this.usuario.correo,
        carrera: this.usuario.carrera,
      });
    }
  }

  // Método para validar el formulario y enviar datos a la API
  checkForm() {
    if (this.modificarForm.invalid) {
      this.mensaje = 'Todos los campos son obligatorios.';
      return;
    }
    this.onSubmit();
  }

  // Método para enviar los datos a la API
  async onSubmit() {
    this.mensaje = '';
    const formData = this.modificarForm.value;

    console.log('Enviando datos a la API:', formData);

    try {
      const response = await this.apiService.modificarUsuario(formData).toPromise();
      console.log('Respuesta de la API:', response);
      if (response.status === 'success') {
        this.mensaje = 'Usuario modificado correctamente.';
        this.modificarForm.reset();
      } else {
        this.mensaje = 'Error: ' + response.message;
      }
    } catch (error) {
      this.manejoError(error);
    }
  }

  manejoError(error: any) {
    console.error('Error en la API:', error);
    if (error.error && error.error.message) {
      this.mensaje = 'Error: ' + error.error.message;
    } else {
      this.mensaje = 'Error al modificar el usuario: ' + error.message;
    }
  }

  // Método para navegar a la página de login
  navegarALogin() {
    this.navController.navigateBack('/login');
  }
}
