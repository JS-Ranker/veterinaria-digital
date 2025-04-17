import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Ya lo tienes aquí, bien hecho

import { IonicModule } from '@ionic/angular';

import { HistorialMedicoPageRoutingModule } from './historial-medico-routing.module';

import { HistorialMedicoPage } from './historial-medico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // ✔ Necesario para usar [(ngModel)] en el HTML
    IonicModule,
    HistorialMedicoPageRoutingModule
  ],
  declarations: [HistorialMedicoPage]
})
export class HistorialMedicoPageModule {}
