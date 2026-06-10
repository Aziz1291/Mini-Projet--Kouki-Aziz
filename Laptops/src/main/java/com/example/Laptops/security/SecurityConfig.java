package com.example.Laptops.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${app.cors.allowed-origins:http://localhost:4200}")
    private String allowedOriginsRaw;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        List<String> allowedOrigins = Arrays.asList(allowedOriginsRaw.split(","));

		http.csrf(csrf -> csrf.disable())
		    .sessionManagement(session ->
		        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		    .cors(cors -> cors.configurationSource(new CorsConfigurationSource() {
		        @Override
		        public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
		            CorsConfiguration config = new CorsConfiguration();
		            config.setAllowedOrigins(allowedOrigins);
		            config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		            config.setAllowCredentials(true);
		            config.setAllowedHeaders(Arrays.asList("*"));
		            config.setExposedHeaders(Arrays.asList("Authorization"));
		            config.setMaxAge(3600L);
		            return config;
		        }
		    }))
		    .authorizeHttpRequests(requests -> requests
		        .anyRequest().permitAll()
		    );
		    /*.requestMatchers("/api/all/**").hasAnyAuthority("ADMIN","USER")
		    .requestMatchers("/api/getbyid/**").hasAnyAuthority("ADMIN","USER")
		    .requestMatchers(HttpMethod.POST,"/api/addlaptop/**").hasAuthority("ADMIN")
		    .requestMatchers(HttpMethod.PUT,"/api/updatelaptop/**").hasAuthority("ADMIN")
		    .requestMatchers(HttpMethod.DELETE,"/api/dellaptop/**").hasAuthority("ADMIN")
		    .requestMatchers("/models/**").hasAnyAuthority("ADMIN","USER")
		    .anyRequest().authenticated()
		    .addFilterBefore(new JWTAuthorizationFilter(), BasicAuthenticationFilter.class);*/

		return http.build();
	}

}
