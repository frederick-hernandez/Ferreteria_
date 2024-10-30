import { CanActivate, CanActivateFn, Router } from '@angular/router';

import {inject} from '@angular/core';

import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';


export const authguardGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const user$ = authService.estadoauth$
  return authService.estadoauth$.pipe(
    map((user) => {
      if (!user) {
        router.navigateByUrl('auth/login')
        return false;
      } else {
        return true;
      }
    }),
  )
};

export const Puclicguard: CanActivateFn=()=>{
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.estadoauth$.pipe(
    map((user) => {
      if (user) {
        console.log('hola')
        router.navigateByUrl('/')
        return false;
      } else {
        return true;
      }
    }),
  )
}




