import { TranslationWidth } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { config } from './../../config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(user:User):Observable<User>{
    return this.http.post<User>(`${config.apiUrl}/token/`,user).pipe(
      catchError(this.handleError)
    )
  }

  register(user:any): Observable<any>{
    return this.http.post<any>(`${config.apiUrl}/user/register/`,user).pipe(
      catchError(this.handleError)
    )
  }

  logout(token:any):Observable<any>{
    return this.http.post<any>(`${config.apiUrl}/user/logout/blacklist`,token).pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status==0){
      console.error('Se ha producido un error',error.error);
    }else{
      console.error('Backend retorno el codigo de estado: ', error.status, error.error);
    }
    return throwError(()=> new Error("Oops! Ha ocurrido un error: "+error.statusText));
  }

}
