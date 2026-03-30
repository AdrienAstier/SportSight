import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, map, of, Observable, EMPTY, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthRequest, RegisterRequest, UserInfoResponse } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  private readonly _isAuthenticated = signal<boolean>(false);
  private readonly _username = signal<string>('');
  private readonly _role = signal<string>('');

  readonly isAuthenticated = this._isAuthenticated.asReadonly();
  readonly username = this._username.asReadonly();
  readonly role = this._role.asReadonly();
  readonly initials = computed(() =>
    this._username()
      .split(/[\s_]/)
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'U'
  );

  /**
   * Appelé au démarrage de l'application (APP_INITIALIZER).
   * Restaure la session si le cookie access_token est encore valide.
   * Si le token est expiré, l'intercepteur tentera un refresh automatiquement.
   */
  init(): Observable<void> {
    return this.http
      .get<UserInfoResponse>(`${this.baseUrl}/me`, { withCredentials: true })
      .pipe(
        tap((user) => this.setSession(user)),
        map(() => void 0 as void),
        catchError(() => {
          this.clearSession();
          return of(void 0 as void);
        })
      );
  }

  login(credentials: AuthRequest): Observable<void> {
    return this.http
      .post<UserInfoResponse>(`${this.baseUrl}/login`, credentials, { withCredentials: true })
      .pipe(
        tap((user) => this.setSession(user)),
        map(() => void 0 as void)
      );
  }

  register(payload: RegisterRequest): Observable<void> {
    return this.http
      .post<UserInfoResponse>(`${this.baseUrl}/register`, payload, { withCredentials: true })
      .pipe(
        tap((user) => this.setSession(user)),
        map(() => void 0 as void)
      );
  }

  /**
   * Renouvelle l'access token via le refresh token (cookie HttpOnly, Path=/auth/refresh).
   * Le serveur pose un nouveau cookie access_token transparentement.
   * En cas d'échec : la session est effacée et une erreur est propagée.
   */
  refreshToken(): Observable<void> {
    return this.http
      .post<void>(`${this.baseUrl}/refresh`, null, { withCredentials: true })
      .pipe(
        catchError((err) => {
          this.clearSession();
          return throwError(() => err);
        })
      );
  }

  logout(): void {
    this.http
      .post<void>(`${this.baseUrl}/logout`, null, { withCredentials: true })
      .pipe(catchError(() => EMPTY))
      .subscribe({
        complete: () => {
          this.clearSession();
          this.router.navigate(['/auth/login']);
        },
      });
  }

  private setSession(user: UserInfoResponse): void {
    this._isAuthenticated.set(true);
    this._username.set(user.username);
    this._role.set(user.role);
  }

  private clearSession(): void {
    this._isAuthenticated.set(false);
    this._username.set('');
    this._role.set('');
  }
}
