package com.aziz.users.restControllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
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
    public User register(@RequestBody RegistrationRequest request) {
        return userService.registerUser(request);
    }

    @GetMapping("/verifyEmail/{token}")
    public User verifyEmail(@PathVariable("token") String token) {
        return userService.validateToken(token);
    }
}
