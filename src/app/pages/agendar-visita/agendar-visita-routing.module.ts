import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgendarVisitaPage } from './agendar-visita.page';

const routes: Routes = [
  {
    path: '',
    component: AgendarVisitaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgendarVisitaPageRoutingModule {}
