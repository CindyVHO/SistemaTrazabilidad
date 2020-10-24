import { Component, OnInit } from '@angular/core';
import { ReporteMedicoService } from '../reporte-medico/reporte-medico.service';
import { LoginService } from '../login/login.service';
import { HistoricoService } from '../historico/historico.service';

@Component({
  selector: 'app-reporte-medico-visual',
  templateUrl: './reporte-medico-visual.component.html',
  styleUrls: ['./reporte-medico-visual.component.scss']
})
export class ReporteMedicoVisualComponent implements OnInit {

  errores:any = [];
  usuarios:any = [];
  equipos:any = [];

  constructor(private erroresService:ReporteMedicoService, private loginService: LoginService,
    private equiposService:HistoricoService) { }

  async ngOnInit() {
    await this.getUsers();
    await this.getEquipos();
    await this.getErrores();
  }

  parseDate(date) {
    let d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDay();
  }

  parseHour(date) {
    let d = new Date(date);
    return d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
  }

  getUserById(id) {
    return this.usuarios.filter(user => {
      return user.iduser === id;
    })[0] || {};
  }

  getEquipoById(id) {
    return this.equipos.filter(equipo => {
      return equipo.idequipo === id;
    })[0] || {};
  }

  async getEquipos() {
    return this.equiposService.getEquipos()
    .toPromise().then(equipos => {
      this.equipos = (<any>equipos).equipos;
      console.log("EQUIPOS FETCHED", this.equipos);
    });
  }

  getErrores() {
    return this.erroresService.getErrores()
    .subscribe(errores => {
      this.errores = (<any>errores).errores;
      console.log("ERRORES FETCHED", this.errores);
    });
  }

  async getUsers() {
    return this.loginService.getUsers()
    .toPromise().then(users => {
      this.usuarios = (<any>users).users;
      console.log("USUARIOS FETCHED", this.usuarios);
    });
  }

}
