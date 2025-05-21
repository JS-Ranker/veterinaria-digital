import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MascotaFormPageRoutingModule } from './mascota-form-routing.module';

import { MascotaFormPage } from './mascota-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MascotaFormPageRoutingModule
  ],
  declarations: [MascotaFormPage]
})
export class MascotaFormPageModule {}
