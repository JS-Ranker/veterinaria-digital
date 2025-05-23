import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EndocrinologiaPage } from './endocrinologia.page';

const routes: Routes = [
  {
    path: '',
    component: EndocrinologiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EndocrinologiaPageRoutingModule {}
