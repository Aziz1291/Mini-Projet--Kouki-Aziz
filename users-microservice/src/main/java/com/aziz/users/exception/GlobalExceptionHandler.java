package com.aziz.users.exception;

import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ErrorDetails> handleEmailAlreadyExists(
            EmailAlreadyExistsException ex, WebRequest request) {
        ErrorDetails err = new ErrorDetails(
            LocalDateTime.now(), ex.getMessage(),
            request.getDescription(false), "USER_EMAIL_ALREADY_EXISTS");
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<ErrorDetails> handleInvalidToken(
            InvalidTokenException ex, WebRequest request) {
        ErrorDetails err = new ErrorDetails(
            LocalDateTime.now(), ex.getMessage(),
            request.getDescription(false), "INVALID_TOKEN");
        return new ResponseEntity<>(err, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseEntity<ErrorDetails> handleExpiredToken(
            ExpiredTokenException ex, WebRequest request) {
        ErrorDetails err = new ErrorDetails(
            LocalDateTime.now(), ex.getMessage(),
            request.getDescription(false), "EXPIRED_TOKEN");
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleGlobal(
            Exception ex, WebRequest request) {
        ErrorDetails err = new ErrorDetails(
            LocalDateTime.now(), ex.getMessage(),
            request.getDescription(false), "INTERNAL_SERVER_ERROR");
        return new ResponseEntity<>(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
