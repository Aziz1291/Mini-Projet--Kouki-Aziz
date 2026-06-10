package com.example.Laptops.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * Shared JWT constants — must match the values used in users-microservice
 * so that tokens generated there are accepted here.
 */
@Component
public class SecParams {
    public static final long   EXP_TIME = 10L * 24 * 60 * 60 * 1000; // 10 days in ms
    public static final String PREFIX   = "Bearer ";

    private static String secret;

    @Value("${app.jwt.secret}")
    public void setSecret(String value) {
        secret = value;
    }

    public static String SECRET() {
        return secret;
    }
}
