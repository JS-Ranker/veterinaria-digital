import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GastroenterologiaPage } from './gastroenterologia.page';

const routes: Routes = [
  {
    path: '',
    component: GastroenterologiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GastroenterologiaPageRoutingModule {}
