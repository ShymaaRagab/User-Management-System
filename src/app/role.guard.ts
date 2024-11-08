import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const userAuth = inject(AuthService);
  const router = inject(Router);

  if(userAuth.checkRole() && userAuth.isLogin()){
    console.log('true from guard');
    return true;
  }else{
    router.navigate(['/profile']);
    console.log('false from guard');
    return false;
  }


};
