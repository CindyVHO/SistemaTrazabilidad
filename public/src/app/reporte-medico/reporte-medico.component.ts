import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-reporte-medico',
  templateUrl: './reporte-medico.component.html',
  styleUrls: ['./reporte-medico.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReporteMedicoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  confirm(){
    swal("Bien hecho!", "El equipo ha sido registrado exitosamente.", "success");
  }
}
