import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OncologiaPageRoutingModule } from './oncologia-routing.module';

import { OncologiaPage } from './oncologia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OncologiaPageRoutingModule
  ],
  declarations: [OncologiaPage]
})
export class OncologiaPageModule {}
