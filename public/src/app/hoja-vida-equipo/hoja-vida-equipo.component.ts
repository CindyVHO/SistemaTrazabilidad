import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-hoja-vida-equipo',
  templateUrl: './hoja-vida-equipo.component.html',
  styleUrls: ['./hoja-vida-equipo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HojaVidaEquipoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  confirm(){
    swal("Bien hecho!", "El equipo ha sido registrado exitosamente.", "success");
  }
}
