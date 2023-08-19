import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent
  },
]

@NgModule({
  declarations: [
    ViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatTableModule,
    MatIconModule
  ]
})
export class AppointmentsModule { }
