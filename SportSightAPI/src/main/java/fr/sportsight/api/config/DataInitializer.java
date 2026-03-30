package fr.sportsight.api.config;

import fr.sportsight.api.entity.AppUser;
import fr.sportsight.api.repository.AppUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${app.security.admin-default-password}")
    private String adminDefaultPassword;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            AppUser admin = AppUser.builder()
                    .username("admin")
                    .password(passwordEncoder.encode(adminDefaultPassword))
                    .role("ROLE_ADMIN")
                    .build();
            userRepository.save(admin);
            log.warn("Utilisateur admin créé — définissez ADMIN_DEFAULT_PASSWORD en variable d'environnement !");
        }
    }
}
