import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OncologiaPage } from './oncologia.page';

const routes: Routes = [
  {
    path: '',
    component: OncologiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OncologiaPageRoutingModule {}
