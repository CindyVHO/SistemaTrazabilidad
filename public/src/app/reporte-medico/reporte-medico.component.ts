import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import swal from 'sweetalert';
import { ReporteMedicoService } from './reporte-medico.service';
import { HistoricoService } from '../historico/historico.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-reporte-medico',
  templateUrl: './reporte-medico.component.html',
  styleUrls: ['./reporte-medico.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReporteMedicoComponent implements OnInit {

  equipos: any;
  reporte: any = {};
  roles: any = {};
  equipoSeleccionado: any;
  fechaReporte = new Date();
  myControl = new FormControl();
  usuarioSeleccionado: any;
  medicos: any;

  duracionTotal = "00:00";

  constructor(private reporteService: ReporteMedicoService,
    private historicoService: HistoricoService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.getEquipos();
    this.getMedicos();
  }

  async getRoles() {
    return this.loginService.getRoles()
    .toPromise().then(roles => {
        this.roles = (<any>roles).roles;
    });
  }

  async getMedicos() {
    await this.getRoles();
    const rolMedico = this.roles.filter((rol)=>{
      return rol.rol === "Medico";
    })[0];

    this.loginService.getUsers()
    .subscribe(usuarios => {
      this.medicos = (<any>usuarios).users.filter((user)=>{
        return user.rol === rolMedico.idrol;
      });
    });
  }

  getEquipos() {
    this.historicoService.getEquipos()
      .subscribe(equipos => {
        this.equipos = (<any>equipos).equipos;
      });
  }

  getEquipoById(id) {
    let equipos = this.equipos || [];
    return equipos.filter((equipo) => {
      return equipo.idequipo === id;
    })[0] || {};
  }

  userNameSelected(evt) {
    this.usuarioSeleccionado = evt.option && evt.option.value ? evt.option.value.iduser : null;
  }

  dateChanged(fecha, event) {
    console.log("DATE CHANGED", fecha.value);
  }

  validarReporte() {
    if(this.getEquipoById(this.equipoSeleccionado) && this.reporte.observacion &&
      this.usuarioSeleccionado && this.fechaReporte) {
        return true;
    }

    return false;
  }

  formatDate() {
    return this.fechaReporte.getFullYear() + '-' + (this.fechaReporte.getMonth() + 1) + '-' + this.fechaReporte.getDate() + 
          ' ' + this.fechaReporte.getHours() + ':' + this.fechaReporte.getMinutes() + ':' + this.fechaReporte.getSeconds();
  }

  saveReporte() {
    if(this.validarReporte()) {
      this.reporte.userid = this.usuarioSeleccionado;
      this.reporte.equipoid = this.equipoSeleccionado;
      this.reporte.fecha_reporte = this.formatDate();
      this.reporteService.addReporte(this.reporte);
    }
    
  }

  showUser(user: any) {
    return user ? user.name + " " + user.lastname : "";
  }

  confirm() {
    swal("Bien hecho!", "El equipo ha sido registrado exitosamente.", "success");
  }
}
