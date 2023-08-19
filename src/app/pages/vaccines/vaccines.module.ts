import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './view/view.component';
import { Routes,RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

const routes: Routes = [
  {
    path: '',
    component: ViewComponent
  },
]

@NgModule({
  declarations: [
    ViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ]
})
export class VaccinesModule { }
