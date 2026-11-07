import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

const EXCLUDE_URLS = ['/login', '/register', '/verifyEmail'];

function shouldExclude(url: string): boolean {
  return EXCLUDE_URLS.some(path => url.includes(path));
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const jwt = authService.getToken();
  // Signed-out visitors send no Authorization header rather than "Bearer null".
  if (jwt && !shouldExclude(req.url)) {
    const reqWithToken = req.clone({
      setHeaders: { Authorization: 'Bearer ' + jwt }
    });
    return next(reqWithToken);
  }

  return next(req);
};
