package fr.sportsight.api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Réponse retournée par /auth/login, /auth/register et /auth/me.
 * Ne contient aucun token (les tokens sont dans les cookies HttpOnly).
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponse {
    private String username;
    private String role;
}
