package fr.sportsight.api.controller;

import fr.sportsight.api.dto.AuthRequest;
import fr.sportsight.api.dto.RegisterRequest;
import fr.sportsight.api.dto.UserInfoResponse;
import fr.sportsight.api.entity.AppUser;
import fr.sportsight.api.entity.RefreshToken;
import fr.sportsight.api.repository.AppUserRepository;
import fr.sportsight.api.service.CookieService;
import fr.sportsight.api.service.JwtService;
import fr.sportsight.api.service.RefreshTokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final CookieService cookieService;

    @PostMapping("/register")
    public ResponseEntity<UserInfoResponse> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletResponse response
    ) {
        if (userRepository.findByUsername(request.getUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Nom d'utilisateur déjà pris");
        }

        AppUser user = AppUser.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .role("ROLE_USER")
                .build();
        userRepository.save(user);

        issueAuthCookies(user, response);

        return ResponseEntity.status(HttpStatus.CREATED).body(UserInfoResponse.builder()
                .username(user.getUsername())
                .role(user.getRole())
                .build());
    }

    @PostMapping("/login")
    public ResponseEntity<UserInfoResponse> login(
            @Valid @RequestBody AuthRequest request,
            HttpServletResponse response
    ) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        AppUser user = userRepository.findByUsername(request.getUsername()).orElseThrow();
        issueAuthCookies(user, response);

        return ResponseEntity.ok(UserInfoResponse.builder()
                .username(user.getUsername())
                .role(user.getRole())
                .build());
    }

    /**
     * Renouvelle l'access token.
     * Le refresh token est lu depuis le cookie HttpOnly (Path=/auth/refresh).
     * Le token est systématiquement pivoté (one-time use).
     */
    @PostMapping("/refresh")
    public ResponseEntity<Void> refresh(HttpServletRequest request, HttpServletResponse response) {
        String refreshTokenValue = extractCookieValue(request, "refresh_token");
        if (refreshTokenValue == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token manquant");
        }

        RefreshToken rotated = refreshTokenService.verifyAndRotate(refreshTokenValue);
        String newAccessToken = jwtService.generateAccessToken(rotated.getUser());

        cookieService.setAccessTokenCookie(response, newAccessToken);
        cookieService.setRefreshTokenCookie(response, rotated.getToken());

        return ResponseEntity.noContent().build();
    }

    /**
     * Déconnexion : révoque tous les refresh tokens de l'utilisateur et supprime les cookies.
     * Fonctionne même si l'access token est expiré (endpoint public) — les cookies sont toujours effacés.
     */
    @PostMapping("/logout")
    public ResponseEntity<Void> logout(Authentication authentication, HttpServletResponse response) {
        if (authentication != null && authentication.isAuthenticated()) {
            AppUser user = (AppUser) authentication.getPrincipal();
            refreshTokenService.revokeAllForUser(user);
        }
        cookieService.clearAuthCookies(response);
        return ResponseEntity.noContent().build();
    }

    /**
     * Retourne les informations de l'utilisateur authentifié.
     * Utilisé par le frontend au démarrage pour restaurer la session depuis le cookie.
     */
    @GetMapping("/me")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserInfoResponse> me(Authentication authentication) {
        AppUser user = (AppUser) authentication.getPrincipal();
        return ResponseEntity.ok(UserInfoResponse.builder()
                .username(user.getUsername())
                .role(user.getRole())
                .build());
    }

    private void issueAuthCookies(AppUser user, HttpServletResponse response) {
        String accessToken = jwtService.generateAccessToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user);
        cookieService.setAccessTokenCookie(response, accessToken);
        cookieService.setRefreshTokenCookie(response, refreshToken.getToken());
    }

    private String extractCookieValue(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();
        if (cookies == null) return null;
        for (Cookie cookie : cookies) {
            if (name.equals(cookie.getName())) return cookie.getValue();
        }
        return null;
    }
}
