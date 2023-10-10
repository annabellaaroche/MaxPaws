import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Appointment } from '../../../interfaces/appointment';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/auth/LoginService';

@Component({
  selector: 'app-view-appointments',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewComponent {
  dataSource: Appointment[] = [];
  columnsToDisplay = ['fecha_cita', 'motivo_cita', 'mascota'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnDisplayNames: { [key: string]: string } = {
    fecha_cita: 'Fecha',
    motivo_cita: 'Motivo',
    mascota: 'Nombre de la Mascota'
  };
  expandedElement: Appointment | null | undefined;
  
  constructor(apiService: ApiService, loginService: LoginService){
    apiService.getCitaByOwnerId(loginService.getUserId()).subscribe(
      (res)=>{
        this.dataSource = res;
      }
    );
  }
}

const ELEMENT_DATA: Appointment[] = []
