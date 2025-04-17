import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialMedicoPage } from './historial-medico.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialMedicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialMedicoPageRoutingModule {}
