package fr.sportsight.api.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * Filtre de limitation du débit (rate limiting) pour les endpoints d'authentification.
 * Protège contre les attaques par force brute sur /auth/login et /auth/register.
 *
 * Limites par adresse IP :
 *  - /auth/login    : 5 tentatives / minute
 *  - /auth/register : 3 tentatives / minute
 */
@Component
public class RateLimitingFilter extends OncePerRequestFilter {

    private static final int LOGIN_MAX_ATTEMPTS    = 5;
    private static final int REGISTER_MAX_ATTEMPTS = 3;
    private static final long WINDOW_MS            = 60_000L; // 1 minute

    private record RateEntry(AtomicInteger count, Instant windowStart) {}

    private final Map<String, RateEntry> loginAttempts    = new ConcurrentHashMap<>();
    private final Map<String, RateEntry> registerAttempts = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
    ) throws ServletException, IOException {

        if (!"POST".equals(request.getMethod())) {
            filterChain.doFilter(request, response);
            return;
        }

        String path = request.getServletPath();
        String ip   = resolveClientIp(request);

        if ("/auth/login".equals(path)) {
            if (!checkAndIncrement(loginAttempts, ip, LOGIN_MAX_ATTEMPTS)) {
                rejectTooManyRequests(response);
                return;
            }
        } else if ("/auth/register".equals(path)) {
            if (!checkAndIncrement(registerAttempts, ip, REGISTER_MAX_ATTEMPTS)) {
                rejectTooManyRequests(response);
                return;
            }
        }

        filterChain.doFilter(request, response);
    }

    /**
     * Vérifie si l'IP a atteint la limite dans la fenêtre courante.
     * Réinitialise la fenêtre si elle a expiré.
     */
    private boolean checkAndIncrement(Map<String, RateEntry> store, String ip, int maxAttempts) {
        Instant now = Instant.now();
        RateEntry entry = store.compute(ip, (key, existing) -> {
            if (existing == null || existing.windowStart().plusMillis(WINDOW_MS).isBefore(now)) {
                return new RateEntry(new AtomicInteger(0), now);
            }
            return existing;
        });
        return entry.count().incrementAndGet() <= maxAttempts;
    }

    private void rejectTooManyRequests(HttpServletResponse response) throws IOException {
        response.setStatus(429);
        response.setContentType("application/json;charset=UTF-8");
        response.setHeader("Retry-After", "60");
        response.getWriter().write("{\"error\":\"Trop de tentatives. Veuillez réessayer dans 60 secondes.\"}");
    }

    /**
     * Résout l'IP réelle du client en tenant compte des proxies inverses.
     * Utilise X-Forwarded-For en priorité (premier IP de la chaîne).
     */
    private String resolveClientIp(HttpServletRequest request) {
        String forwarded = request.getHeader("X-Forwarded-For");
        if (forwarded != null && !forwarded.isBlank()) {
            return forwarded.split(",")[0].trim();
        }
        String realIp = request.getHeader("X-Real-IP");
        if (realIp != null && !realIp.isBlank()) {
            return realIp.trim();
        }
        return request.getRemoteAddr();
    }
}
