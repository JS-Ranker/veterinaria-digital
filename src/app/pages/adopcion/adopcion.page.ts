import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-adopcion',
  templateUrl: './adopcion.page.html',
  styleUrls: ['./adopcion.page.scss'],
  standalone: false
})
export class AdopcionPage {

  // Constructor con NavController para navegación
  constructor(private navController: NavController) {}

  // Datos de los perros disponibles para adopción
  perros = [
    {
      nombre: 'Dulce',
      descripcion: 'Dulce es un perro amigable y lleno de energía.',
      foto: 'assets/img/dulce.jpeg'  
    },
    {
      nombre: 'Negra',
      descripcion: 'Negra es una perrita leal y protectora.',
      foto: 'assets/img/negra.jpeg'  
    },
    {
      nombre: 'Kae',
      descripcion: 'Kae es una perra tranquila y cariñosa.',
      foto: 'assets/img/kae.jpeg'  //  URL de la foto 
    }
  ];

  // Función para redirigir al formulario de adopción de Google Formulario
  redirigirFormularioAdopcion() {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScV0GtttMaoxsC-QAA0tQU0IYlwFlTQPiOOGK0NRGroD0LIGw/viewform', '_blank');
  }

  // Función para redirigir a la página de Bienvenida
  irABienvenido() {
    this.navController.navigateBack('/bienvenida'); // Aquí '/bienvenido' es el nombre de la ruta de tu página de bienvenida
  }
}
