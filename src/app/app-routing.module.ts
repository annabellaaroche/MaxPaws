import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AppointmentsModule } from './pages/appointments/appointments.module'
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { sesionGuard } from './guards/sesion.guard';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent,
    canActivate:[sesionGuard]
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
    loadChildren:() => import('./pages/appointments/appointments.module').then(m => m.AppointmentsModule),
    canActivate:[sesionGuard]
  },
  {
    path:'vaccines',
    loadChildren:() => import('./pages/vaccines/vaccines.module').then(m => m.VaccinesModule),
    canActivate:[sesionGuard]
  },
  {
    path:'recommendations',
    loadChildren:() => import('./pages/recommendations/recommendations.module').then(m => m.RecommendationsModule),
    canActivate:[sesionGuard]
  },
  {
    path:'account',
    loadChildren:() => import('./pages/account/account.module').then(m => m.AccountModule),
    canActivate:[sesionGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
