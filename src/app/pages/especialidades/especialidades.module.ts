import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EspecialidadesPageRoutingModule } from './especialidades-routing.module';

import { EspecialidadesPage } from './especialidades.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EspecialidadesPageRoutingModule
  ],
  declarations: [EspecialidadesPage]
})
export class EspecialidadesPageModule {}
