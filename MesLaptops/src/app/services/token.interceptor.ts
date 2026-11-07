import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { ConsentService } from './consent.service';

const EXCLUDE_URLS = ['/login', '/register', '/verifyEmail'];

function shouldExclude(url: string): boolean {
  return EXCLUDE_URLS.some(path => url.includes(path));
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const consent = inject(ConsentService);
  const router = inject(Router);

  // No request leaves the app before the privacy notice is accepted.
  if (!consent.accepted) {
    return throwError(() => new HttpErrorResponse({ status: 0, statusText: 'Consent required', url: req.url }));
  }

  const open = shouldExclude(req.url);
  if (!open) {
    const jwt = authService.getToken();
    // Signed out or expired: refuse at once instead of waiting for the server.
    if (!jwt || authService.isTokenExpired()) {
      authService.clearSession();
      router.navigate(['/login']);
      return throwError(() => new HttpErrorResponse({ status: 401, statusText: 'Unauthorized', url: req.url }));
    }
    req = req.clone({ setHeaders: { Authorization: 'Bearer ' + jwt } });
  }

  return next(req).pipe(catchError((err: unknown) => {
    if (!open && err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        authService.clearSession();
        router.navigate(['/login']);
      } else if (err.status === 403) {
        router.navigate(['/app-forbidden']);
      }
    }
    return throwError(() => err);
  }));
};
