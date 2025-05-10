import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { ApiService } from '../../services/api.service'; // Asegúrate de importar tu servicio API

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  registroForm: FormGroup;
  mostrarContrasena: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private apiService: ApiService

  ) {
    this.registroForm = this.fb.group({
      rut: ['', [Validators.required, this.validarRut]],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasena: ['', Validators.required],
      telefono: ['', [Validators.required, this.validarTelefonoChileno]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  // Validador personalizado para comprobar que las contraseñas coinciden
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('contrasena');
    const confirmPassword = control.get('confirmarContrasena');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ 'noCoincide': true });
      return { passwordMismatch: true };
    }
    
    return null;
  }

  async registrar() {
    if (this.registroForm.valid) {
      // Mostrar cargando
      const loading = await this.loadingCtrl.create({
        message: 'Procesando registro...',
        spinner: 'crescent',
      });
      await loading.present();
      
      try {
        // Preparar datos para enviar a la API
        const datosDueno = {
          rut: this.registroForm.value.rut,
          nombre: this.registroForm.value.nombre,
          apellido: this.registroForm.value.apellido,
          email: this.registroForm.value.correo,
          password: this.registroForm.value.contrasena,
          telefono: this.registroForm.value.telefono.replace(/\D/g, ''),
          activo: true // Asumimos que el dueño estará activo por defecto
        };
        console.log('HSC : Datos que se enviarán:', datosDueno);

        // Enviar datos a la API
        this.apiService.registrarDueno(datosDueno)
          .subscribe(
            (response) => {
              loading.dismiss();
              this.mostrarMensajeExito();
              
            },
            async (error) => {
              loading.dismiss();
              console.error('Error al registrar:', error);
              
              // Mostrar mensaje de error según la respuesta del servidor
              let mensajeError = 'Error al registrar. Intenta de nuevo.';
              console.error('HSC : Error al registrar:', JSON.stringify(error));

              if (error.status === 409) {
                mensajeError = 'Ya existe un usuario con ese RUT o correo electrónico.';
              } else if (error.error && error.error.message) {
                mensajeError = error.error.message;
              }
              
              const toast = await this.toastCtrl.create({
                message: mensajeError,
                duration: 3000,
                position: 'bottom',
                color: 'danger'
              });
              toast.present();
            }
          );
      } catch (err) {
        loading.dismiss();
        console.error('HSC : Error inesperado:', JSON.stringify(err));
        
        const toast = await this.toastCtrl.create({
          message: 'Error inesperado. Por favor, intenta más tarde.',
          duration: 3000,
          position: 'bottom',
          color: 'danger'
        });
        toast.present();
      }
    } else {
      this.registroForm.markAllAsTouched();
      
      // Mostrar mensaje de error de validación
      const toast = await this.toastCtrl.create({
        message: 'Por favor, completa correctamente todos los campos',
        duration: 2000,
        position: 'bottom',
        color: 'danger'
      });
      toast.present();
    }
  }

  async mostrarMensajeExito() {
    const nombreUsuario = this.registroForm.value.nombre; // Guardar el nombre antes de resetear
    this.registroForm.reset(); // Luego limpiar
  
    const alert = await this.alertCtrl.create({
      header: '¡Felicidades!',
      subHeader: 'Registro Exitoso',
      message: `${nombreUsuario}, tu cuenta ha sido creada correctamente. Bienvenido/a a nuestra clínica veterinaria.`,
      buttons: [{
        text: 'Continuar',
        handler: () => {
          this.router.navigateByUrl('/login');
        }
      }],
      cssClass: 'success-alert'
    });
  
    await alert.present();
  }
  




  
  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  campoInvalido(campo: string): boolean {
    const control = this.registroForm.get(campo);
    return !!(control && control.invalid && control.touched);
  }

  mensajeError(campo: string): string {
    const control = this.registroForm.get(campo);
    if (!control || !control.errors) return '';
    
    if (control.errors['required']) return 'Este campo es obligatorio.';
    if (control.errors['email']) return 'Ingresa un correo válido.';
    if (control.errors['minlength'])
      return `Mínimo ${control.errors['minlength'].requiredLength} caracteres.`;
    if (control.errors['rutInvalido']) return 'RUT inválido. Formato 12345678-9.';
    if (control.errors['telefonoInvalido']) return 'Teléfono inválido. Debe ser un número chileno comenzando con 9.';
    if (control.errors['noCoincide']) return 'Las contraseñas no coinciden.';
    
    return '';
  }

  validarRut(control: AbstractControl): ValidationErrors | null {
    const rut: string = control.value;
    if (!rut) return null;
    return /^[0-9]+-[0-9kK]$/.test(rut) ? null : { rutInvalido: true };
  }

  validarTelefonoChileno(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    
    if (!value) return null;
    
    const digits = value.replace(/\D/g, '');
    
    if (digits.length === 9) {
      return digits.startsWith('9') ? null : { telefonoInvalido: true };
    } else if (digits.length === 11) {
      return digits.startsWith('569') ? null : { telefonoInvalido: true };
    }
    
    return { telefonoInvalido: true };
  }

  ionViewDidEnter() {
    const ctl = this.registroForm.get('telefono');
    ctl?.valueChanges.subscribe((valor: string) => {
      if (!valor) return;
      
      let digits = valor.replace(/\D/g, '');
      
      if (digits.length > 11) digits = digits.slice(0, 11);
      
      if (digits.length === 9 && digits.startsWith('9')) {
        const fmt = `+56 9 ${digits.slice(1, 5)} ${digits.slice(5)}`;
        ctl.setValue(fmt, { emitEvent: false });
      } else if (digits.length === 11 && digits.startsWith('569')) {
        const fmt = `+56 9 ${digits.slice(3, 7)} ${digits.slice(7)}`;
        ctl.setValue(fmt, { emitEvent: false });
      }
    });
  }

  irABienvenido() {
    this.registroForm.reset();
    this.router.navigateByUrl('/bienvenida');
  }

ionViewWillEnter() {
  this.registroForm.reset();
  
  this.registroForm = this.fb.group({
    rut: ['', [Validators.required, this.validarRut]],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required, Validators.minLength(6)]],
    confirmarContrasena: ['', Validators.required],
    telefono: ['', [Validators.required, this.validarTelefonoChileno]]
  }, {
    validators: this.passwordMatchValidator
  });
}





}

