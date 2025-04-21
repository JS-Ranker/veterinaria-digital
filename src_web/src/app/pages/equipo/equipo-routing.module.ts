import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EquipoPage } from './equipo.page';

const routes: Routes = [
  {
    path: '',
    component: EquipoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EquipoPageRoutingModule {}
