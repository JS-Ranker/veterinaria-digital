import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GastroenterologiaPageRoutingModule } from './gastroenterologia-routing.module';

import { GastroenterologiaPage } from './gastroenterologia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GastroenterologiaPageRoutingModule
  ],
  declarations: [GastroenterologiaPage]
})
export class GastroenterologiaPageModule {}
