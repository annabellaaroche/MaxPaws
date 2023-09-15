import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/auth/LoginService';
import { Injectable, Injector, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

function fn(): Promise<boolean> {
  let loginService = inject(LoginService);
  let router = inject(Router);

  return new Promise<boolean>((resolve) => {
    if (!localStorage.getItem("refresh")) {
      router.navigate(['/login']);
      resolve(false);
    } else {
      loginService.refreshToken().subscribe({
        next: (x: any) => {
          if (!!x.access && !!x.refresh) {
            resolve(true);
          }
          resolve(false);
        },
        error: (err: any) => {
          router.navigate(['/login']);
          resolve(false);
        }
      });
    }
  },
  )

}
export const sesionGuard: CanActivateFn = (route, state) => {
  return fn().then(
    (res) => {
      //console.log('respuesta en guardia',res)
      return res;
    },
    (err) => {
      //console.log('respuesta en guardia',err)
      return false;
    }
  );
};
