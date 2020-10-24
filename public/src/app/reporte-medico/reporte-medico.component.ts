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
  reporte: any;
  fechaReporte = new Date();
  public form: FormGroup = new FormGroup({
    calculatedTime: new FormControl(''),
  });

  duracionTotal = "00:00";
  horaInicial;
  horaFinal;
  
  constructor(private reporteService: ReporteMedicoService, private historicoService: HistoricoService) { }

  ngOnInit() {
    this.getEquipos();
  }

  getEquipos() {
    this.historicoService.getEquipos()
    .subscribe(equipos => {
      this.equipos = equipos;
    });
  }

  updateHoraTotal() {
    if(this.horaInicial && this.horaFinal) {
      let horaI = parseInt(this.horaInicial.split(":")[0]),
      minutoI = parseInt(this.horaInicial.split(":")[1]),
      horaF = parseInt(this.horaFinal.split(":")[0]),
      minutoF = parseInt(this.horaFinal.split(":")[1]);

      if(minutoF < minutoI) {
        minutoF += 60;
        horaF = horaF >= 1 ? horaF-- : 23;
      }

      const minutoTotal = (minutoF - minutoI)%60,
      horaTotal = Math.abs((horaF - horaI) + ((minutoF - minutoI)/60 > 1 ? (minutoF - minutoI)/60 : 0));
      
      this.duracionTotal = (horaTotal < 10 ? "0" + horaTotal: horaTotal) + ":" + 
                              (minutoTotal < 10 ? "0" + minutoTotal : minutoTotal);
    }
  }

  dateChanged(fecha, event) {
    console.log("DATE CHANGED", fecha.value);
  }

  initHourChanged(horaInicio, event) {
    this.horaInicial = horaInicio.value;
    this.updateHoraTotal();
  }

  endHourChanged(horaFin, event) {
    this.horaFinal = horaFin.value;
    this.updateHoraTotal();
  }

  saveReporte() {
  }

  confirm(){
    swal("Bien hecho!", "El equipo ha sido registrado exitosamente.", "success");
  }
}
