package com.aziz.users.security;

import java.util.Collections;
import org.springframework.beans.factory.annotation.Autowired;
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

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http.sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .csrf(csrf -> csrf.disable())

            // CORS — allow Angular (localhost:4200) to read the Authorization header
            .cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
                @Override
                public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                    CorsConfiguration config = new CorsConfiguration();
                    config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
                    config.setAllowedMethods(Collections.singletonList("*"));
                    config.setAllowedHeaders(Collections.singletonList("*"));
                    // CRITICAL: expose Authorization so Angular can read the JWT token
                    config.setExposedHeaders(Collections.singletonList("Authorization"));
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
