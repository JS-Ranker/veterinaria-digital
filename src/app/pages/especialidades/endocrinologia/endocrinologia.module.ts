import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EndocrinologiaPageRoutingModule } from './endocrinologia-routing.module';

import { EndocrinologiaPage } from './endocrinologia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EndocrinologiaPageRoutingModule
  ],
  declarations: [EndocrinologiaPage]
})
export class EndocrinologiaPageModule {}
