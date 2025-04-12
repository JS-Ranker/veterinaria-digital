import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms'; // Importación para formularios reactivos
import { FormsModule } from '@angular/forms'; // Importación para formularios template-driven (si lo necesitas)
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// Importa el módulo de la página de videollamada
import { VideoCallPageModule } from './pages/video-call/video-call.module';

// Importar Ionic Storage
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule, // Añade ReactiveFormsModule aquí
    FormsModule, // Añade FormsModule si planeas usar formularios template-driven
    VideoCallPageModule, // Asegúrate de importar el módulo de la página de videollamada
    IonicStorageModule.forRoot(),  // Agrega IonicStorageModule aquí
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite],
  bootstrap: [AppComponent],
})
export class AppModule {}
