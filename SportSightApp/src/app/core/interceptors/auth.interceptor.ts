import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

/**
 * Intercepteur d'authentification basé sur les cookies.
 *
 * - Ajoute `withCredentials: true` sur toutes les requêtes pour que le navigateur
 *   envoie automatiquement les cookies HttpOnly (access_token, refresh_token).
 * - Sur une réponse 401 (token expiré) : tente un refresh transparent, puis rejoue la requête.
 * - Si le refresh échoue : redirige vers la page de login.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const credentialsReq = req.clone({ withCredentials: true });

  return next(credentialsReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Ne pas tenter de refresh sur les endpoints d'auth eux-mêmes
      if (error.status === 401 && !req.url.includes('/auth/')) {
        return authService.refreshToken().pipe(
          switchMap(() => next(credentialsReq)),
          catchError(() => {
            void router.navigate(['/auth/login']);
            return throwError(() => error);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
