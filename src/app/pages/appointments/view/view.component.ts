import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { Appointment } from '../../../interfaces/appointment';


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
  dataSource = ELEMENT_DATA;
  columnsToDisplay = [
    'date', 'reason', 'pet_name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnDisplayNames: { [key: string]: string } = {
    date: 'Fecha',
    reason: 'Motivo',
    pet_name: 'Nombre de la Mascota'
  };
  expandedElement: Appointment | null | undefined;
}

const ELEMENT_DATA: Appointment[] = [
  {
    date: new Date('11/1/2020'),
    reason: 'Perrito se queja al caminar',
    notes: 'Perrito presenta una astilla en la patita',
    pet:1,
    pet_name:'Max'
  },
  {
    date: new Date('12/2/2021'),
    reason: 'No se come toda su comida',
    notes: 'Presenta bajo peso',
    pet:1,
    pet_name:'Max'
  },
  {
    date: new Date('10/3/2022'),
    reason: 'Perrito duerme demasiado',
    notes: 'Presenta bajo nivel de hierro',
    pet:2,
    pet_name:'Oreo'
  },
]
