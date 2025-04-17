import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PrincipalPageRoutingModule } from './principal-routing.module';
import { PrincipalPage } from './principal.page';
import { DbService } from 'src/app/services/db.service'; // Importa el servicio


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPageRoutingModule
  ],
  declarations: [PrincipalPage],
  providers: [DbService] // Agrega DbService aquí
})
export class PrincipalPageModule {}
