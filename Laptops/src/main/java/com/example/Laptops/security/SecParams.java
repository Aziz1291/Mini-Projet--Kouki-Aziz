package com.example.Laptops.security;

/**
 * Shared JWT constants — must match the values used in users-microservice
 * so that tokens generated there are accepted here.
 */
public interface SecParams {
    long   EXP_TIME = 10 * 24 * 60 * 60 * 1000; // 10 days in ms
    String SECRET   = "azizamri243@gmail.com";
    String PREFIX   = "Bearer ";
}
