export interface AuthRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

/** Réponse retournée par /auth/login, /auth/register et /auth/me.
 *  Les tokens ne transitent plus dans le corps de la réponse — ils sont dans les cookies HttpOnly. */
export interface UserInfoResponse {
  username: string;
  role: string;
}
