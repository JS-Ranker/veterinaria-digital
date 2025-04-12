import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Asegúrate de importar ReactiveFormsModule
import { IonicModule } from '@ionic/angular';
import { ModificarUsuarioPageRoutingModule } from './modificar-usuario-routing.module';
import { ModificarUsuarioPage } from './modificar-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Añade esta línea
    IonicModule,
    ModificarUsuarioPageRoutingModule
  ],
  declarations: [ModificarUsuarioPage]
})
export class ModificarUsuarioPageModule {}
