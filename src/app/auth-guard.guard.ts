import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const userAuth = inject(AuthService);
  const router = inject(Router);
  if(userAuth.isLogin()){
    return true;
  }else{
    router.navigate(['/login'])
    return false;
  }
};
