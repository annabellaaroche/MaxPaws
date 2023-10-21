import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ViewChild } from '@angular/core';
import { Appointment } from '../../../interfaces/appointment';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/auth/LoginService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

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
  dataSource!: MatTableDataSource<Appointment>;
  columnsToDisplay = ['fecha_cita', 'motivo_cita', 'mascota'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnDisplayNames: { [key: string]: string } = {
    fecha_cita: 'Fecha',
    motivo_cita: 'Motivo',
    mascota: 'Nombre de la Mascota'
  };
  expandedElement: Appointment | null | undefined;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(apiService: ApiService, loginService: LoginService){
    apiService.getCitaByOwnerId(loginService.getUserId()).subscribe(
      (res)=>{
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
      }
    );
  }
}

const ELEMENT_DATA: Appointment[] = []
