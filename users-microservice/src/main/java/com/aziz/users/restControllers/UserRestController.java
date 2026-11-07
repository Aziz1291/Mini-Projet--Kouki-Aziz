package com.aziz.users.restControllers;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.aziz.users.entities.User;
import com.aziz.users.register.RegistrationRequest;
import com.aziz.users.service.UserService;

@RestController
@CrossOrigin(origins = "*")
public class UserRestController {

    @Autowired
    UserService userService;

    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.findAllUsers();
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody RegistrationRequest request) {
        // Temporary: the hosted demo cannot currently send verification email.
        return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE)
                .body(Map.of("message", "Account registration is temporarily unavailable."));
    }

    @GetMapping("/verifyEmail/{token}")
    public User verifyEmail(@PathVariable("token") String token) {
        return userService.validateToken(token);
    }
}
