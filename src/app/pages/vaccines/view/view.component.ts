import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Vaccine } from 'src/app/interfaces/vaccine';
import { ApiService } from 'src/app/services/api.service';
import { LoginService } from 'src/app/services/auth/LoginService';

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
export class ViewComponent implements OnInit{
  dataSource: Vaccine[] = [];
  columnsToDisplay = ['name', 'date', 'next_date' , 'pet_name'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  columnDisplayNames: { [key: string]: string } = {
    name: 'Nombre vacuna',
    date: 'Fecha',
    next_date: 'Siguiente Cita',
    pet_name: 'Nombre de la Mascota'
  };
  expandedElement: Vaccine | null | undefined;

  constructor(apiService: ApiService, loginService: LoginService){
    apiService.getVacunaByOwnerId(loginService.getUserId()).subscribe(
      (res)=>{
        this.dataSource = res
      }
    );

  }

  getProp(propKey:string,object:any){
    return (object as any)[propKey]
  }

  ngOnInit(): void {
    setTimeout(() => {
      const header = document.querySelectorAll('.header');
      header.forEach(header => {
        header.addEventListener('click', () => {
          header.classList.toggle('collapsed')
          var nextRow = header.nextElementSibling;
          while (nextRow && !nextRow.classList.contains('header')) {
            nextRow.classList.toggle('hidden')
            nextRow = nextRow.nextElementSibling;
          }
        });
      });
    }, 100)
  }
}


