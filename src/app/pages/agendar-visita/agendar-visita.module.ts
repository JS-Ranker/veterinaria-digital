import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgendarVisitaPageRoutingModule } from './agendar-visita-routing.module';

import { AgendarVisitaPage } from './agendar-visita.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgendarVisitaPageRoutingModule
  ],
  declarations: [AgendarVisitaPage]
})
export class AgendarVisitaPageModule {}
