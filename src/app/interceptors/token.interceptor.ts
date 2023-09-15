import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of, throwError } from "rxjs";
import { LoginService } from "../services/auth/LoginService";




@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private inject: Injector, private router: Router, private loginService: LoginService) { }
    ctr = 0;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.loginService.getToken();
        if (token) {
            // If we have a token, we set it to the header
            let reqCloned = req.clone({
                setHeaders: { Authorization: `Bearer ${token}` }
            });
            return next.handle(reqCloned);
        } else {
            return next.handle(req).pipe(catchError(err => this.handleAuthError(err, req, next)));
        }
    }

    private handleAuthError(err: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        if (err && err.status === 401 && this.ctr != 1) {
            this.ctr++;
            this.loginService.refreshToken().subscribe({
                next: (x: any) => {
                    
                    let reqCloned = req.clone({
                        setHeaders: { Authorization: `Bearer ${this.loginService.getToken}` }
                    });
                    return next.handle(reqCloned);
                },
                error: (err: any) => {
                    this.loginService.logout().subscribe({
                        next: (x: any) => {
                            this.router.navigateByUrl('/');
                            return of(err.message);
                        }
                    });
                }
            });
            return of("Attempting to Refresh Tokens");
        }
        else {
            this.ctr = 0;
            return throwError(() => new Error("Non Authenticationn Error"));
        }

    }
}
