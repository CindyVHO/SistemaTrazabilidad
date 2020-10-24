import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import swal from 'sweetalert';

@Component({
  selector: 'app-registro-mantenimiento',
  templateUrl: './registro-mantenimiento.component.html',
  styleUrls: ['./registro-mantenimiento.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegistroMantenimientoComponent implements OnInit {
  nombreIngeniero:String = "";
  public form: FormGroup = new FormGroup({
    calculatedTime: new FormControl(''),
  });

  duracionTotal = "00:00";
  horaInicial;
  horaFinal;

  constructor() { }

  ngOnInit() {
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

  confirm(){
    swal("Bien hecho!", "El equipo ha sido registrado exitosamente.", "success");
  }

}
