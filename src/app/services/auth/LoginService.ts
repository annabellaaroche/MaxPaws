import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { config } from './../../config';
import * as moment from "moment";
import { Route, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${config.apiUrl}/token/`, user)
      .pipe(
        tap((response: any) => {
          this.setSession(response);
        }),
        catchError(this.handleError)
      )
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/user/register/`, user).pipe(
      catchError(this.handleError)

    );
  }

  logout(): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/user/logout/backlist/`, { refresh_token: this.getRefreshToken() }).pipe(
      tap(() => {
        // Eliminar elementos del localStorage solo si la solicitud es exitosa
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("expires_at");
        localStorage.removeItem("userLoginOn");
        this.router.navigate(["/login"])
      }), catchError(this.handleError)
    );
  }
  refreshToken(): Observable<any> {
    return this.http.post<any>(`${config.apiUrl}/token/refresh/`, { refresh: this.getRefreshToken() }).pipe(
      tap((response: any) => {
        this.setSession(response);
      }),
      catchError(this.handleError)
    );
  }
  private setSession(authResult: { access: string; refresh: string; expires: string }) {

    localStorage.setItem('access', authResult.access);
    localStorage.setItem('refresh', authResult.refresh);
    localStorage.setItem('expires_at', authResult.expires);
    localStorage.setItem('userLoginOn', 'true');
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status == 0) {
      console.error('Se ha producido un error', error.error);
    } else {
      console.error('Backend retorno el codigo de estado: ', error.status, error.error);
    }
    return throwError(() => new Error("Oops! Ha ocurrido un error: " + error.statusText));
  }

  getToken() {
    return localStorage.getItem('access');
  }
  getRefreshToken() {
    return localStorage.getItem('refresh');
  }
  getUserId() {
    let userID = 0;
    let token = this.getToken();
    if (token) {
      let token_decoded = jwt_decode(token);
      userID = (token_decoded as any).user_id;
    }
    return userID;
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
