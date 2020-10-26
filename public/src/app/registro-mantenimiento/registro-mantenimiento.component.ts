import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import swal from 'sweetalert';
import { RegistroMantenimientoService } from './registro-mantenimiento.service';
import { HistoricoService } from '../historico/historico.service';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-registro-mantenimiento',
  templateUrl: './registro-mantenimiento.component.html',
  styleUrls: ['./registro-mantenimiento.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistroMantenimientoComponent implements OnInit {
  nombreIngeniero: String = "";
  roles: any = {};
  usuarioSeleccionado: any;
  ingenieros: any;
  myControl = new FormControl();
  equipos: any;
  equipoSeleccionado: any;
  mantenimiento: any = {};
  fechaMantenimiento = new Date();

  public form: FormGroup = new FormGroup({
    calculatedTime: new FormControl(''),
  });

  duracionTotal = "00:00";
  horaInicial;
  horaFinal;

  constructor(private registroMantenimientoService: RegistroMantenimientoService,
    private historicoService: HistoricoService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.getIngeniero();
    this.getEquipos();
  }

  updateHoraTotal() {
    if (this.horaInicial && this.horaFinal) {
      let horaI = parseInt(this.horaInicial.split(":")[0]),
        minutoI = parseInt(this.horaInicial.split(":")[1]),
        horaF = parseInt(this.horaFinal.split(":")[0]),
        minutoF = parseInt(this.horaFinal.split(":")[1]);

      if (minutoF < minutoI) {
        minutoF += 60;
        horaF = horaF >= 1 ? horaF-- : 23;
      }

      const minutoTotal = (minutoF - minutoI) % 60,
        horaTotal = Math.abs((horaF - horaI) + ((minutoF - minutoI) / 60 > 1 ? (minutoF - minutoI) / 60 : 0));

      this.duracionTotal = (horaTotal < 10 ? "0" + horaTotal : horaTotal) + ":" +
        (minutoTotal < 10 ? "0" + minutoTotal : minutoTotal);
    }
  }

  dateChanged(fecha, event) {
    this.fechaMantenimiento = fecha.value;
    this.mantenimiento.fecha = this.fechaMantenimiento;
  }

  initHourChanged(horaInicio, event) {
    this.horaInicial = horaInicio.value;
    this.mantenimiento.hora_inicio = this.fechaMantenimiento + " " + this.horaInicial;
    this.updateHoraTotal();
  }

  endHourChanged(horaFin, event) {
    this.horaFinal = horaFin.value;
    this.mantenimiento.hora_fin = this.fechaMantenimiento + " " + this.horaFinal;
    this.updateHoraTotal();
  }

  async getRoles() {
    return this.loginService.getRoles()
      .toPromise().then(roles => {
        this.roles = (<any>roles).roles;
      });
  }

  async getIngeniero() {
    await this.getRoles();
    const rolIngeniero = this.roles.filter((rol) => {
      return rol.rol === "IngenieroBiomedico";
    })[0];

    this.loginService.getUsers()
      .subscribe(usuarios => {
        this.ingenieros = (<any>usuarios).users.filter((user) => {
          return user.rol === rolIngeniero.idrol;
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
    this.usuarioSeleccionado = evt.option && evt.option.value ? evt.option.value : null;
    this.mantenimiento.firma = this.usuarioSeleccionado.name + ' ' + this.usuarioSeleccionado.lastname;
  }

  showUser(user: any) {
    return user ? user.name + " " + user.lastname : "";
  }

  validarForm() {
    if (Object.keys(this.mantenimiento).length === 10 && this.equipoSeleccionado && this.usuarioSeleccionado) {
      for(let item of Object.keys(this.mantenimiento)){
        if(this.mantenimiento[item] === ""){
          return false;
        }
      }
      return true;
    }
    return false;
  }

  formatDate() {
    return this.fechaMantenimiento.getFullYear() + '-' + (this.fechaMantenimiento.getMonth() + 1) + '-' + this.fechaMantenimiento.getDate() +
      ' ' + this.fechaMantenimiento.getHours() + ':' + this.fechaMantenimiento.getMinutes() + ':' + this.fechaMantenimiento.getSeconds();
  }

  saveMantenimiento() {
    if (this.validarForm()) {
      this.mantenimiento.userid = this.usuarioSeleccionado.iduser;
      this.mantenimiento.equipoid = this.equipoSeleccionado;
      this.registroMantenimientoService.addMantenimiento(this.mantenimiento).subscribe(mantenimiento => {
        swal("Mantenimiento Agregado Correctamente", mantenimiento.id, "success");
      });
    }
  }

  confirm() {
    swal("Bien hecho!", "El equipo ha sido registrado exitosamente.", "success");
  }

}
