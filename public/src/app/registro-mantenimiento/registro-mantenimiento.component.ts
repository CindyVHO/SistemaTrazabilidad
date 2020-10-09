import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl} from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-registro-mantenimiento',
  templateUrl: './registro-mantenimiento.component.html',
  styleUrls: ['./registro-mantenimiento.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistroMantenimientoComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  dateChanged(fecha, event) {
    console.log("DATE CHANGED", fecha.value);
  }

  initHourChanged(horaInicio, event) {
    console.log("INIT HOUR CHANGED", horaInicio.value);
  }

  endHourChanged(horaFin, event) {
    console.log("END HOUR CHANGED", horaFin.value);
  }

  confirm(){
    swal("Bien hecho!", "El equipo ha sido registrado exitosamente.", "success");
  }

}
