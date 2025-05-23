import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardiologiaPage } from './cardiologia.page';

const routes: Routes = [
  {
    path: '',
    component: CardiologiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardiologiaPageRoutingModule {}
