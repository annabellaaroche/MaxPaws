import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { config } from './../../config';
import * as moment from "moment";
import { transformMenu } from '@angular/material/menu';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${config.apiUrl}/token/`, user)
    .pipe(
      map((response:any)=>{
        this.setSession(response);
        return response;
      }),
      catchError(err => {return throwError(err);})
    )
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/user/register/`, user).pipe(
      catchError(this.handleError)
      
    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/user/logout/blacklist`, this.getRefreshToken()).pipe(
      tap(() => {
        // Eliminar elementos del localStorage solo si la solicitud es exitosa
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("expires_at");
      }),catchError(this.handleError)
    );
  }
  refreshToken(): Observable<any>{
    return this.http.post<any>(`${config.apiUrl}/token/refresh/`, this.getRefreshToken()).pipe(
      catchError(this.handleError)
      
    );
  }
  private setSession(authResult: { access: string; refresh: string; expires:string}){

    localStorage.setItem('access',authResult.access);
    localStorage.setItem('refresh',authResult.refresh);
    localStorage.setItem('expires_at',authResult.expires);
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error('Backend retorno el codigo de estado: ', error.status, error.error);
    }
    return throwError(() => new Error("Oops! Ha ocurrido un error: " + error.statusText));
  }

  getToken(){
    console.log(localStorage.getItem('access'))
    return localStorage.getItem('access');
  }
  getRefreshToken(){
    return localStorage.getItem('refresh');
  }

  addAuthorizationHeader(headers: HttpHeaders): HttpHeaders {
    const token = this.getToken();
    if (token) {
      return headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

/*
  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
}

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }  

*/
}
