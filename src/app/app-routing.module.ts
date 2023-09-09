import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppointmentsModule } from './pages/appointments/appointments.module'
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'appointments',
    loadChildren:() => import('./pages/appointments/appointments.module').then(m => m.AppointmentsModule)
  },
  {
    path:'vaccines',
    loadChildren:() => import('./pages/vaccines/vaccines.module').then(m => m.VaccinesModule)
  },
  {
    path:'recommendations',
    loadChildren:() => import('./pages/recommendations/recommendations.module').then(m => m.RecommendationsModule)
  },
  {
    path:'account',
    loadChildren:() => import('./pages/account/account.module').then(m => m.AccountModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
