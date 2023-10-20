import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, throwError, map } from 'rxjs';
import { User } from '../interfaces/user';
import { LoginComponent } from '../auth/login/login.component';
import { LoginService } from './auth/LoginService';
import { Appointment } from '../interfaces/appointment';
import { Vaccine } from '../interfaces/vaccine';
import { Mascota } from '../interfaces/mascota';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /*headers = new HttpHeaders();
  headersWithAuth = this.loginService.addAuthorizationHeader(this.headers);*/
  constructor(private http: HttpClient, private loginService: LoginService) {
  }


  owner(): Observable<any> {
    return this.http.get(`${config.apiUrl}/owner/`)
      .pipe(
        tap((response: any) => {
        }),
        catchError(this.handleError)
      )
  }

  cita(): Observable<any> {
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
  vacuna(): Observable<any> {
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
  getVacunaByOwnerId(user_id:any=''):Observable<any>{
    return this.http.get(`${config.apiUrl}/vacuna/by_owner_id/?owner_id=`+user_id).pipe(
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

  getCitaByOwnerId(user_id:any=''):Observable<any>{
    return this.http.get(`${config.apiUrl}/cita/by_owner_id/?owner_id=`+user_id).pipe(
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
  pet(user_id:any=''): Observable<any> {
    return this.http.get(`${config.apiUrl}/pets/by_owner_id/?owner_id=`+user_id).pipe(
      map((response: any) => response.map(
        (x: any) => {
          return {
            ...x,
            id: x.id_pet,
            name: x.name_pet,
          }
        }
      )),
      catchError(this.handleError)
    )
  }

  getLoggedUser():Observable<any>{
    return this.http.get(`${config.apiUrl}/user/logedUser/`)
  .pipe(
    tap((response: any) => {
    }),
    catchError(this.handleError)
  )
}

  raza(): Observable<any> {
    return this.http.get(`${config.apiUrl}/raza/`).pipe(
      map((response: any) => response.map(
        (x: any) => {
          return {
            id: x.id_raza,
            raza: x.name_raza,
          }
        }
      )),
      catchError(this.handleError)
    )
  }

  petSize(): Observable<any> {
    return this.http.get(`${config.apiUrl}/petSize/`).pipe(
      map((response: any) => response.map(
        (x: any) => {
          return {
            id: x.id_pet_size,
            size: x.name_tamano,
          }
        }
      )),
      catchError(this.handleError)
    )
  }
  crearCita(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${config.apiUrl}/cita/`, appointment)
    .pipe(
      catchError(this.handleError)
    )
  }

  crearVacuna(vacuna: Vaccine): Observable<Vaccine> {
    return this.http.post<Vaccine>(`${config.apiUrl}/vacuna/`, vacuna)
    .pipe(
      catchError(this.handleError)
    )
  }
  
  crearMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(`${config.apiUrl}/pets/`, mascota)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error('Backend retorno el codigo de estado: ', error.status, error.error);
    }
    return throwError(() => new Error("Oops! Ha ocurrido un error: " + error.error));
  }
}