import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import swal from 'sweetalert';
import { ReporteMedicoService } from './reporte-medico.service';
import { HistoricoService } from '../historico/historico.service';

@Component({
  selector: 'app-reporte-medico',
  templateUrl: './reporte-medico.component.html',
  styleUrls: ['./reporte-medico.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReporteMedicoComponent implements OnInit {

  equipos: any;
  reporte: any = {};
  equipoSeleccionado: any;
  fechaReporte = new Date();
  myControl = new FormControl();

  duracionTotal = "00:00";
  
  constructor(private reporteService: ReporteMedicoService, private historicoService: HistoricoService) { }

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
    return equipos.filter((equipo)=>{
      return equipo.idequipo === id;
    })[0] || {};
  }

  dateChanged(fecha, event) {
    console.log("DATE CHANGED", fecha.value);
  }

  saveReporte() {
  }

  confirm(){
    swal("Bien hecho!", "El equipo ha sido registrado exitosamente.", "success");
  }
}
