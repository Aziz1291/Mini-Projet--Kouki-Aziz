package com.aziz.users.security;

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
 * If the "Authorization" header contains a valid Bearer JWT:
 *   - Decodes and verifies the token using the shared secret
 *   - Extracts username + roles from the payload
 *   - Sets the authenticated principal in the SecurityContext
 * If no/invalid token is present the request continues unauthenticated
 * (Spring Security will then block it if the route requires authentication).
 */
public class JWTAuthorizationFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                     HttpServletResponse response,
                                     FilterChain filterChain)
            throws ServletException, IOException {

        String jwt = request.getHeader("Authorization");

        // Pass-through if no token or wrong prefix
        if (jwt == null || !jwt.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Verify signature and expiry
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SecParams.SECRET())).build();

            // Strip "Bearer " prefix (7 characters)
            jwt = jwt.substring(7);

            DecodedJWT decodedJWT = verifier.verify(jwt);

            String username = decodedJWT.getSubject();
            List<String> roles = decodedJWT.getClaims().get("roles").asList(String.class);

            // Map role strings to Spring Security GrantedAuthority objects
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            for (String r : roles) {
                authorities.add(new SimpleGrantedAuthority(r));
            }

            // Place the authenticated user into the security context
            UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authToken);

        } catch (Exception e) {
            // Invalid / expired token → clear context and return 401
            SecurityContextHolder.clearContext();
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid or expired JWT token: " + e.getMessage());
            return;
        }

        filterChain.doFilter(request, response);
    }
}
