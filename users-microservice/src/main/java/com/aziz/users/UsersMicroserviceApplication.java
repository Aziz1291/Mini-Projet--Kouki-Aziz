package com.aziz.users;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import com.aziz.users.service.UserService;

@SpringBootApplication
public class UsersMicroserviceApplication {

    @Autowired
    UserService userService;

    public static void main(String[] args) {
        SpringApplication.run(UsersMicroserviceApplication.class, args);
    }

    /**
     * Seeds the database with default roles and users.
     *
     * IMPORTANT: Comment out the body of this method after the first run,
     * otherwise it will try to insert duplicate data on each restart.
     */
    @PostConstruct
    void init_users() {
        // ✅ Data already seeded — DO NOT uncomment unless users_db is wiped clean.
        /*
        userService.addRole(new Role(null, "ADMIN"));
        userService.addRole(new Role(null, "USER"));

        userService.saveUser(new User(null, "admin",   "123", "admin@laptops.com",   true, null));
        userService.saveUser(new User(null, "aziz",    "123", "aziz@laptops.com",    true, null));
        userService.saveUser(new User(null, "yassine", "123", "yassine@laptops.com", true, null));

        userService.addRoleToUser("admin",   "ADMIN");
        userService.addRoleToUser("admin",   "USER");
        userService.addRoleToUser("aziz",    "USER");
        userService.addRoleToUser("yassine", "USER");
        */
    }
}
