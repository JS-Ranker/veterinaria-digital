import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideollamadaPage } from './videollamada.page';

const routes: Routes = [
  {
    path: '',
    component: VideollamadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideollamadaPageRoutingModule {}
