import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthService);

  if (authService.isAuthenticated()) {
    const cloned = req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + localStorage.getItem('token')
      ),
    });

    return next(cloned);
  }
  else {
    return next(req);
  }
};
