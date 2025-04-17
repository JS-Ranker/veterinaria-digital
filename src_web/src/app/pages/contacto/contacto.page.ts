import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: false
})
export class ContactoPage implements OnInit {

  contactoForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario
    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit() {}

  // Función que se llama cuando el formulario se envía
  enviarFormulario() {
    if (this.contactoForm.valid) {
      console.log('Formulario enviado:', this.contactoForm.value);
      // 🔧 Aquí puedes hacer un POST a tu API para guardar los datos en MySQL
      this.contactoForm.reset();
    } else {
      console.log('Formulario inválido');
    }
  }

}
