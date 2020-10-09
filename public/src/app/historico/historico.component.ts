import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoricoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  confirm(){
    swal("Bien hecho!", "El equipo ha sido registrado exitosamente.", "success");
  }
}
