import { NgModule } from '@angular/core'; // Importa el decorador NgModule desde Angular core
import { CommonModule } from '@angular/common'; // Importa CommonModule para usar directivas comunes como ngIf y ngFor
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule y ReactiveFormsModule para trabajar con formularios en Angular

import { IonicModule } from '@ionic/angular'; // Importa IonicModule para integrar Ionic con Angular

import { LoginPageRoutingModule } from './login-routing.module'; // Importa el módulo de enrutamiento específico para la página de login

import { LoginPage } from './login.page'; // Importa el componente LoginPage

@NgModule({
  imports: [
    CommonModule, // Añade CommonModule para directivas comunes
    FormsModule, // Añade FormsModule para usar formularios en template-driven
    ReactiveFormsModule, // Añade ReactiveFormsModule para formularios reactivos
    IonicModule, // Añade IonicModule para funcionalidad específica de Ionic
    LoginPageRoutingModule // Añade el módulo de enrutamiento para la página de login
  ],
  declarations: [LoginPage] // Declara el componente LoginPage para que esté disponible en este módulo
})
export class LoginPageModule {} // Define y exporta el módulo LoginPageModule
