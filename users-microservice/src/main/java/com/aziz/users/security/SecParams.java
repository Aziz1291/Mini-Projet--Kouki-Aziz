package com.aziz.users.security;

/**
 * Central place for JWT security constants.
 * Modify EXP_TIME and SECRET as needed.
 */
public interface SecParams {
    long   EXP_TIME = 10 * 24 * 60 * 60 * 1000; // 10 days in milliseconds
    String SECRET   = "azizamri243@gmail.com";
}
