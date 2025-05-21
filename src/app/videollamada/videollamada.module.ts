import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideollamadaPageRoutingModule } from './videollamada-routing.module';

import { VideollamadaPage } from './videollamada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideollamadaPageRoutingModule
  ],
  declarations: [VideollamadaPage]
})
export class VideollamadaPageModule {}
