import { Injectable } from '@angular/core';
import { config } from '../config';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { User } from '../interfaces/user';
import { LoginComponent } from '../auth/login/login.component';
import { LoginService } from './auth/LoginService';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = new HttpHeaders();
  headersWithAuth = this.loginService.addAuthorizationHeader(this.headers);
  constructor(private http: HttpClient, private loginService: LoginService) {
   }
  

  Owner(): Observable<any> {
    return this.http.get(`${config.apiUrl}/owner/`,{ headers: this.headersWithAuth })
    .pipe(
      tap((response:any)=>{
      }),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error('Backend retorno el codigo de estado: ', error.status, error.error);
    }
    return throwError(() => new Error("Oops! Ha ocurrido un error: " + error.statusText));
  }
}