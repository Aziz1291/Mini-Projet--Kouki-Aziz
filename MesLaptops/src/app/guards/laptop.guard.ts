import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

/** Admin-only pages: login if signed out, 403 page if signed in without the ADMIN role. */
export const laptopGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.getToken()) authService.loadToken();
  if (!authService.getToken() || authService.isTokenExpired()) {
    authService.clearSession();
    return router.parseUrl('/login');
  }
  return authService.isAdmin() ? true : router.parseUrl('/app-forbidden');
};
