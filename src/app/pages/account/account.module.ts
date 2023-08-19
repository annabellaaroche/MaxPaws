import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input'
import { MatToolbarModule } from '@angular/material/toolbar';


const routes: Routes = [
  {
    path: '',
    component: ViewComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
]

@NgModule({
  declarations: [
    ViewComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatToolbarModule
  ]
})
export class AccountModule { }
