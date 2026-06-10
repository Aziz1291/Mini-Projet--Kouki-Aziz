package com.aziz.users.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Central place for JWT security constants.
 * SECRET is read from the app.jwt.secret property (set via env var JWT_SECRET in production).
 * EXP_TIME stays as a constant (10 days).
 */
@Component
public class SecParams {

    public static final long EXP_TIME = 10L * 24 * 60 * 60 * 1000; // 10 days in ms

    private static String secret;

    @Value("${app.jwt.secret}")
    public void setSecret(String value) {
        secret = value;
    }

    public static String getSecret() {
        return secret;
    }

    // Keep backward-compatible constant-style access via helper method
    public static String SECRET() {
        return secret;
    }
}
