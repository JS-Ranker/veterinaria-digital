import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdopcionPageRoutingModule } from './adopcion-routing.module';

import { AdopcionPage } from './adopcion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdopcionPageRoutingModule
  ],
  declarations: [AdopcionPage]
})
export class AdopcionPageModule {}
