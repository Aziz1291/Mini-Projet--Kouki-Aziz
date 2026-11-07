import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ConsentService } from '../services/consent.service';

/** Nothing but the consent screen and the privacy page opens before the notice is accepted. */
export const consentGuard: CanActivateFn = () =>
  inject(ConsentService).accepted ? true : inject(Router).parseUrl('/consent');

/** The consent route only exists until the notice is accepted. */
export const consentPageGuard: CanActivateFn = () =>
  inject(ConsentService).accepted ? inject(Router).parseUrl('/login') : true;

/** A signed-out visitor, or one with an expired token, goes straight to the login page. */
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  if (!auth.getToken()) auth.loadToken();
  if (auth.getToken() && !auth.isTokenExpired()) return true;
  auth.clearSession();
  return router.parseUrl('/login');
};
