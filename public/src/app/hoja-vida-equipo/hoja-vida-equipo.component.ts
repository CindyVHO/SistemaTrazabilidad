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
  equipoSeleccionado: any;
  hojaVida: any = {};
  fechaHojaVida = new Date();

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
    console.log("DATE CHANGED", fecha.value);
  }

  validarForm() {
    if (Object.keys(this.hojaVida).length === 10 && this.equipoSeleccionado) {
      for (let item of Object.keys(this.hojaVida)) {
        if (this.hojaVida[item] === "") {
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

  savehojaVida() {
    if (this.validarForm()) {
      this.hojaVida.equipoid = this.equipoSeleccionado;
      this.hojaVidaService.addHojaVida(this.hojaVida).subscribe(hojaVida => {
        swal("hojaVida Agregado Correctamente", hojaVida.id, "success");
      });
    }
  }

  confirm() {
    swal("Bien hecho!", "El equipo ha sido registrado exitosamente.", "success");
  }
}
