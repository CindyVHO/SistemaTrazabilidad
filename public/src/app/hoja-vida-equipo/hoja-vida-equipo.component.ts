import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert';
import { HistoricoService } from '../historico/historico.service';
import { HojaVidaService } from '../hoja-vida-equipo/hoja-vida-equipo.service';

@Component({
  selector: 'app-hoja-vida-equipo',
  templateUrl: './hoja-vida-equipo.component.html',
  styleUrls: ['./hoja-vida-equipo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HojaVidaEquipoComponent implements OnInit {

  equipos: any;
  equipoSeleccionado: any = 0;
  hojaVida: any = {
    reg_sanitario: 0,
    reg_invima: 0,
    reg_importacion: 0,
    tipo_riesgo: 0,
    tipo_funcion: 0,
    alimentacion: 0,
    adquisicion: 0,
    fijo: 0,
    movil: 0,
    uso: 0
  };
  fechaHojaVida = new Date();
  fechaExpiracion = new Date();

  constructor(private hojaVidaService: HojaVidaService,
    private historicoService: HistoricoService) { }

  ngOnInit() {
    this.getEquipos();
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


  dateChanged(fecha, event) {
    this.fechaHojaVida = fecha.value;
    this.hojaVida.fecha_instalacion = this.fechaHojaVida;
    console.log("DATE CHANGED", fecha.value);
  }

  dateExpiredChanged(fecha, event) {
    this.fechaExpiracion = fecha.value;
    this.hojaVida.expiracion_garantia = this.fechaExpiracion;
    console.log("DATE CHANGED", fecha.value);
  }

  validarForm() {
    if (Object.keys(this.hojaVida).length === 19 && this.equipoSeleccionado) {
      for (let item of Object.keys(this.hojaVida)) {
        if (this.hojaVida[item] === "" || this.hojaVida[item] === 0) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  formatDate() {
    return this.fechaHojaVida.getFullYear() + '-' + (this.fechaHojaVida.getMonth() + 1) + '-' + this.fechaHojaVida.getDate() +
      ' ' + this.fechaHojaVida.getHours() + ':' + this.fechaHojaVida.getMinutes() + ':' + this.fechaHojaVida.getSeconds();
  }

  saveHojaVida() {
    if (this.validarForm()) {
      this.hojaVida.equipoid = this.equipoSeleccionado;
      this.hojaVidaService.addHojaVida(this.hojaVida).subscribe(hojaVida => {
        swal("Hoja de vida Agregada Correctamente", hojaVida.id, "success");
      });
    }
  }

  confirm() {
    swal("Bien hecho!", "El equipo ha sido registrado exitosamente.", "success");
  }
}
