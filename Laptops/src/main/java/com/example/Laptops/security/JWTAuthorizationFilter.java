package com.example.Laptops.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

/**
 * Runs once per request.
 * Reads the "Authorization: Bearer <token>" header, verifies the JWT
 * signature & expiry, then loads username + roles into the SecurityContext
 * so Spring Security can enforce the requestMatchers() rules in SecurityConfig.
 */
public class JWTAuthorizationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = request.getHeader("Authorization");

        // No token or wrong prefix → pass through unauthenticated
        if (jwt == null || !jwt.startsWith(SecParams.PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SecParams.SECRET)).build();

            // Strip "Bearer " prefix
            jwt = jwt.substring(SecParams.PREFIX.length());

            DecodedJWT decodedJWT = verifier.verify(jwt);
            String username = decodedJWT.getSubject();
            List<String> roles = decodedJWT.getClaims().get("roles").asList(String.class);

            Collection<GrantedAuthority> authorities = new ArrayList<>();
            for (String r : roles) {
                authorities.add(new SimpleGrantedAuthority(r));
            }

            UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authToken);

        } catch (Exception e) {
            SecurityContextHolder.clearContext();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or expired JWT: " + e.getMessage());
            return;
        }

        filterChain.doFilter(request, response);
    }
}
