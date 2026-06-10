package com.aziz.users.security;

import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    AuthenticationManager authMgr;

    @Value("${app.cors.allowed-origins:http://localhost:4200}")
    private String allowedOriginsRaw;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        List<String> allowedOrigins = Arrays.asList(allowedOriginsRaw.split(","));

        http.sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .csrf(csrf -> csrf.disable())

            // CORS — allow the Angular app to read the Authorization header
            .cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
                @Override
                public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(allowedOrigins);
                    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                    config.setAllowedHeaders(Arrays.asList("*"));
                    // CRITICAL: expose Authorization so Angular can read the JWT token
                    config.setExposedHeaders(Arrays.asList("Authorization"));
                    return config;
                }
            }))

            .authorizeHttpRequests(requests ->
                requests
                    .requestMatchers("/login", "/register/**", "/verifyEmail/**").permitAll()
                    .requestMatchers("/all").hasAuthority("ADMIN")
                    .anyRequest().authenticated())

            .addFilterBefore(
                new JWTAuthenticationFilter(authMgr),
                UsernamePasswordAuthenticationFilter.class)

            .addFilterBefore(
                new JWTAuthorizationFilter(),
                UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
