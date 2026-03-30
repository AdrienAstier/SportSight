import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Une erreur est survenue';
      if (error.error?.message) {
        message = error.error.message;
      } else if (error.status === 0) {
        message = 'Impossible de contacter le serveur';
      } else if (error.status === 403) {
        message = 'Accès refusé';
      } else if (error.status === 404) {
        message = 'Ressource introuvable';
      } else if (error.status >= 500) {
        message = 'Erreur serveur interne';
      }
      return throwError(() => ({ ...error, displayMessage: message }));
    })
  );
};
