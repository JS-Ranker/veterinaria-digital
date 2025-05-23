import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EspecialidadesPage } from './especialidades.page';

const routes: Routes = [
  {
    path: '',
    component: EspecialidadesPage
  },  {
    path: 'oncologia',
    loadChildren: () => import('./oncologia/oncologia.module').then( m => m.OncologiaPageModule)
  },
  {
    path: 'endocrinologia',
    loadChildren: () => import('./endocrinologia/endocrinologia.module').then( m => m.EndocrinologiaPageModule)
  },
  {
    path: 'gastroenterologia',
    loadChildren: () => import('./gastroenterologia/gastroenterologia.module').then( m => m.GastroenterologiaPageModule)
  },
  {
    path: 'cardiologia',
    loadChildren: () => import('./cardiologia/cardiologia.module').then( m => m.CardiologiaPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EspecialidadesPageRoutingModule {}
