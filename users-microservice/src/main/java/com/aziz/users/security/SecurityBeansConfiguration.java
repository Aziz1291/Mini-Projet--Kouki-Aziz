package com.aziz.users.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * Declares the beans needed by Spring Security:
 *  - BCryptPasswordEncoder  (used by UserServiceImpl to hash passwords)
 *  - AuthenticationManager  (used by JWTAuthenticationFilter)
 */
@Configuration
public class SecurityBeansConfiguration {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
