import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';
import { LoadingController, ToastController } from '@ionic/angular'; // 👈 Agregamos esto

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  usuario = {
    rut: '',
    password: ''
  };

  constructor(
    private apiService: ApiService,
    private storageService: StorageService,
    private router: Router,
    private loadingCtrl: LoadingController, 
    private toastCtrl: ToastController      
  ) {}
  
  async ngOnInit() {
    const usuarioGuardado = await this.storageService.get('usuario_actual');
  
    if (usuarioGuardado && usuarioGuardado.rut) {
      console.log('Usuario ya logueado: ', usuarioGuardado);
      this.router.navigateByUrl('/principal');
    } else {
      this.usuario = {
        rut: '',
        password: ''
      };
    }
  }
  

  async login() {
    if (!this.usuario || !this.usuario.rut || !this.usuario.password) {
      this.mostrarToast('Por favor, ingresa tu RUT y contraseña.');
      return;
    }
  
    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
      spinner: 'crescent',
    });
    await loading.present();
  
    this.apiService.login(this.usuario.rut, this.usuario.password).subscribe({
      next: async (respuesta) => {
        console.log('Respuesta de login:', respuesta);
        
        const rutAutenticado = respuesta?.rut; 
        if (rutAutenticado) {
          
          this.apiService.traerDuenoPorRut(rutAutenticado).subscribe({
            next: async (datosDueno) => {
              console.log('Datos del dueño:', datosDueno);
              await loading.dismiss();
  
              // Guardamos en storage toda la info
              await this.storageService.set('usuario_actual', {
                rut: datosDueno.rut,
                nombre: datosDueno.nombre,
                apellido: datosDueno.apellido,
                email: datosDueno.email,
                telefono: datosDueno.telefono
              });
  
              this.router.navigateByUrl('/principal');
            },
            error: async (error) => {
              await loading.dismiss();
              console.error('Error al traer datos del dueño:', JSON.stringify(error));

              this.mostrarToast('No se pudo obtener los datos del usuario.');
            }
          });
        } else {
          await loading.dismiss();
          this.mostrarToast('Error inesperado. Intenta de nuevo.');
        }
      },
      error: async (err) => {
        await loading.dismiss();
        console.error('Error completo de login:', err);
        const mensaje = err?.error?.error || 'Usuario o contraseña incorrectos.';
        this.mostrarToast(mensaje);
      }
    });
  }
  
  
  

  irARegistro() {
    this.router.navigateByUrl('/register');
  }

  irARecuperar() {
    this.router.navigateByUrl('/recuperar-password');
  }

  irABienvenido() {
    this.router.navigateByUrl('/bienvenida');
  }


  async mostrarToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }
}
