import { Component } from '@angular/core';
import { Vaccine } from 'src/app/interfaces/vaccine';

@Component({
  selector: 'app-view-vaccines',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'date', 'next_date' , 'pet_name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnDisplayNames: { [key: string]: string } = {
    name: 'Nombre',
    date: 'Fecha',
    next_date: 'Siguiente Cita',
    pet_name: 'Nombre de la Mascota'
  };
  expandedElement: Vaccine | null | undefined;
}

const ELEMENT_DATA: Vaccine[] = [
  {
    name:'Vitaminas caninas',
    date: new Date('11/1/2020'),
    next_date: new Date('12/3/2020'),
    pet:1,
    pet_name:'Max'
  },
  {
    name:'Antipulgas',
    date: new Date('5/5/2021'),
    next_date: new Date('6/6/2021'),
    pet:1,
    pet_name:'Max'
  },
  {
    name:'Desparacitante',
    date: new Date('7/7/2022'),
    next_date: new Date('8/8/2022'),
    pet:1,
    pet_name:'Max'
  },
]
