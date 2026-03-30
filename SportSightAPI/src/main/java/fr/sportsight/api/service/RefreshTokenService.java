package fr.sportsight.api.service;

import fr.sportsight.api.entity.AppUser;
import fr.sportsight.api.entity.RefreshToken;
import fr.sportsight.api.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    private final RefreshTokenRepository refreshTokenRepository;

    @Transactional
    public RefreshToken createRefreshToken(AppUser user) {
        // Révoque les tokens existants de l'utilisateur (rotation)
        refreshTokenRepository.deleteByUser(user);

        RefreshToken refreshToken = RefreshToken.builder()
                .token(UUID.randomUUID().toString())
                .user(user)
                .expiryDate(Instant.now().plusMillis(refreshTokenExpiration))
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyToken(String token) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new CredentialsExpiredException("Refresh token introuvable"));

        if (refreshToken.isRevoked() || refreshToken.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(refreshToken);
            throw new CredentialsExpiredException("Refresh token expiré ou révoqué");
        }

        return refreshToken;
    }

    /**
     * Vérifie le token et pivote (one-time use) : invalide l'ancien, crée un nouveau.
     * Protège contre le re-use d'un refresh token volé.
     */
    @Transactional
    public RefreshToken verifyAndRotate(String token) {
        RefreshToken existing = verifyToken(token);
        return createRefreshToken(existing.getUser());
    }

    /**
     * Révoque tous les refresh tokens d'un utilisateur.
     * Appelé lors du logout pour invalider toutes les sessions actives.
     */
    @Transactional
    public void revokeAllForUser(AppUser user) {
        refreshTokenRepository.deleteByUser(user);
    }

    @Transactional
    public void revokeToken(String token) {
        refreshTokenRepository.findByToken(token).ifPresent(rt -> {
            rt.setRevoked(true);
            refreshTokenRepository.save(rt);
        });
    }
}
