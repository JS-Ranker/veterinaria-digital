import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Agrega ReactiveFormsModule aquí

import { IonicModule } from '@ionic/angular';

import { CrearUsuarioPageRoutingModule } from './crear-usuario-routing.module';

import { CrearUsuarioPage } from './crear-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Asegúrate de que esto esté aquí
    IonicModule,
    CrearUsuarioPageRoutingModule
  ],
  declarations: [CrearUsuarioPage]
})
export class CrearUsuarioPageModule {}
