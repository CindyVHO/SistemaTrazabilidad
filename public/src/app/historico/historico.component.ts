import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import swal from 'sweetalert';
import { HistoricoService } from './historico.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HistoricoComponent implements OnInit {
  equipo: any = {
    "manualPartes": false,
    "manualOperacion": false,
    "manualServicio": false,
    "manualOtros": "",
    "planoElectrico": false,
    "planoElectronico": false,
    "planoHidraulico": false,
    "planoNeumatico": false
  };

  constructor(private equipoService: HistoricoService) { }

  ngOnInit() {
  }

  validateData() {
    if (Object.keys(this.equipo).length === 18) {
      return true;
    }
    return false;
  }

  confirm() {
    if (this.validateData()) {
      this.equipoService.addEquipo(this.equipo)
        .subscribe(equipoId => {
          swal("El equipo ha sido registrado exitosamente.", this.equipo.codigo, "success");
        });
    }
  }
}
