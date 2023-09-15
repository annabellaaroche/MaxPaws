import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Vaccine } from 'src/app/interfaces/vaccine';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-view-vaccines',
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
  dataSource: Vaccine[] = [];
  columnsToDisplay = ['name', 'date', 'next_date' , 'pet_name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnDisplayNames: { [key: string]: string } = {
    name: 'Nombre',
    date: 'Fecha',
    next_date: 'Siguiente Cita',
    pet_name: 'Nombre de la Mascota'
  };
  expandedElement: Vaccine | null | undefined;

  constructor(apiService: ApiService){
    apiService.Vacuna().subscribe(
      (res)=>{
        this.dataSource = res
      }
    );
  }
}

