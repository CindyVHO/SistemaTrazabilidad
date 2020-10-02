import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HistoricoComponent } from './historico/historico.component';
import { HojaVidaEquipoComponent } from './hoja-vida-equipo/hoja-vida-equipo.component';
import { HomeComponent } from './home/home.component';
import { RegistroHistoricoComponent } from './registro-historico/registro-historico.component';
import { RegistroMantenimientoComponent } from './registro-mantenimiento/registro-mantenimiento.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: 'hoja-de-vida', component: HojaVidaEquipoComponent },
  { path: 'registro-historico', component: RegistroHistoricoComponent },
  { path: 'registro-mantenimiento', component: RegistroMantenimientoComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HistoricoComponent,
    HojaVidaEquipoComponent,
    HomeComponent,
    RegistroHistoricoComponent,
    RegistroMantenimientoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,{ useHash: true }),
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
