import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',  // Redirige a la nueva página splash al iniciar la app
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'mascota-form',
    loadChildren: () => import('./pages/mascota-form/mascota-form.module').then(m => m.MascotaFormPageModule)
  },
  {
    path: 'historial-medico',
    loadChildren: () => import('./pages/historial-medico/historial-medico.module').then(m => m.HistorialMedicoPageModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./pages/bienvenida/bienvenida.module').then(m => m.BienvenidaPageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./pages/recuperar-password/recuperar-password.module').then(m => m.RecuperarPasswordPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./pages/splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'adopcion',
    loadChildren: () => import('./pages/adopcion/adopcion.module').then(m => m.AdopcionPageModule)
  },
  {
    path: 'videollamada',
    loadChildren: () => import('./videollamada/videollamada.module').then( m => m.VideollamadaPageModule)
  },
  {
    path: 'especialidades',
    loadChildren: () => import('./pages/especialidades/especialidades.module').then( m => m.EspecialidadesPageModule)
  },
  {
    path: 'agendar-visita',
    loadChildren: () => import('./pages/agendar-visita/agendar-visita.module').then( m => m.AgendarVisitaPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'market',
    loadChildren: () => import('./pages/market/market.module').then( m => m.MarketPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
