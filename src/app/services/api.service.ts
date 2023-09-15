import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map } from 'rxjs';
import { User } from '../interfaces/user';
import { LoginComponent } from '../auth/login/login.component';
import { LoginService } from './auth/LoginService';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /*headers = new HttpHeaders();
  headersWithAuth = this.loginService.addAuthorizationHeader(this.headers);*/
  constructor(private http: HttpClient, private loginService: LoginService) {
  }


  Owner(): Observable<any> {
    return this.http.get(`${config.apiUrl}/owner/`)
      .pipe(
        tap((response: any) => {
        }),
        catchError(this.handleError)
      )
  }

  Cita(): Observable<any> {
    return this.http.get(`${config.apiUrl}/cita/`).pipe(
      map((response: any) => response.map(
        (x: any) => {
          return {
            ...x,
            notes: x.notas_cita,
            mascota: x.mascota.name_pet
          }
        }
      )),
      catchError(this.handleError)
    )
  }
  Vacuna(): Observable<any> {
    return this.http.get(`${config.apiUrl}/vacuna/`).pipe(
      map((response: any) => response.map(
        (x: any) => {
          return {
            ...x,
            name:x.name_vacuna,
            date:x.date_vacuna,
            next_date:x.next_vacuna_date,
            pet_name: x.mascota.name_pet
          }
        }
      )),
      catchError(this.handleError)
    )
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error('Backend retorno el codigo de estado: ', error.status, error.error);
    }
    return throwError(() => new Error("Oops! Ha ocurrido un error: " + error));
  }
}