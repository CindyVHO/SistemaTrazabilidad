import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HistoricoService } from '../historico/historico.service';

@Component({
  selector: 'app-listar-equipos',
  templateUrl: './listar-equipos.component.html',
  styleUrls: ['./listar-equipos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListarEquiposComponent implements OnInit {

  equipos: any = [];
  equiposError : any = [];

  constructor(private historicoService: HistoricoService) { }

  ngOnInit() {
    this.getEquipos();
    this.getEquiposError();
  }

  getEquipos() {
    this.historicoService.getEquipos()
      .subscribe(equipos => {
        this.equipos = (<any>equipos).equipos;
      });
  }

  getEquiposError() {
    this.historicoService.getEquiposError()
      .subscribe(equipos => {
        this.equiposError = (<any>equipos).equipos;
      });
  }

  equipoHasError(equipoId){
    return this.equiposError.filter((equipo)=> {
      return equipo.idequipo === equipoId;
    })[0];
  }

  getEquipoById(id) {
    let equipos = this.equipos || [];
    return equipos.filter((equipo) => {
      return equipo.idequipo === id;
    })[0] || {};
  }

}
