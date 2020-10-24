import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {
  MatFormFieldModule,
  MatMenuModule,
  MatCheckboxModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatAutocompleteModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HistoricoComponent } from './historico/historico.component';
import { HojaVidaEquipoComponent } from './hoja-vida-equipo/hoja-vida-equipo.component';
import { HomeComponent } from './home/home.component';
import { RegistroHistoricoComponent } from './registro-historico/registro-historico.component';
import { RegistroMantenimientoComponent } from './registro-mantenimiento/registro-mantenimiento.component';
import { ReporteMedicoComponent } from './reporte-medico/reporte-medico.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReporteMedicoVisualComponent } from './reporte-medico-visual/reporte-medico-visual.component';
import { ListarEquiposComponent } from './listar-equipos/listar-equipos.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'historico', component: HistoricoComponent },
  { path: 'hoja-de-vida', component: HojaVidaEquipoComponent },
  { path: 'registro-historico', component: RegistroHistoricoComponent },
  { path: 'registro-mantenimiento', component: RegistroMantenimientoComponent },
  { path: 'reporte-medico', component: ReporteMedicoComponent },
  { path: 'reporte-medico-visual', component: ReporteMedicoVisualComponent },
  { path: 'listar-equipos', component: ListarEquiposComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HistoricoComponent,
    HojaVidaEquipoComponent,
    HomeComponent,
    RegistroHistoricoComponent,
    RegistroMantenimientoComponent,
    ReporteMedicoComponent,
    ReporteMedicoVisualComponent,
    ListarEquiposComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,{ useHash: true }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers: [
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
