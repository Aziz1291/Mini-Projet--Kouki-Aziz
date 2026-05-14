package com.aziz.users.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.aziz.users.entities.Role;
import com.aziz.users.entities.User;
import com.aziz.users.entities.VerificationToken;
import com.aziz.users.exception.EmailAlreadyExistsException;
import com.aziz.users.exception.ExpiredTokenException;
import com.aziz.users.exception.InvalidTokenException;
import com.aziz.users.register.RegistrationRequest;
import com.aziz.users.repos.RoleRepository;
import com.aziz.users.repos.UserRepository;
import com.aziz.users.repos.VerificationTokenRepository;
import com.aziz.users.util.EmailSender;

@Transactional
@Service
public class UserServiceImpl implements UserService {

    @Autowired UserRepository userRep;
    @Autowired RoleRepository roleRep;
    @Autowired BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired VerificationTokenRepository verificationTokenRepo;
    @Autowired EmailSender emailSender;

    @Override
    public User saveUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRep.save(user);
    }

    @Override
    public User addRoleToUser(String username, String rolename) {
        User usr = userRep.findByUsername(username);
        Role r = roleRep.findByRole(rolename);
        usr.getRoles().add(r);
        return usr;
    }

    @Override
    public Role addRole(Role role) {
        return roleRep.save(role);
    }

    @Override
    public User findUserByUsername(String username) {
        return userRep.findByUsername(username);
    }

    @Override
    public List<User> findAllUsers() {
        return userRep.findAll();
    }

    @Override
    public User registerUser(RegistrationRequest request) {
        Optional<User> existing = userRep.findByEmail(request.getEmail());
        if (existing.isPresent())
            throw new EmailAlreadyExistsException("Email déjà utilisé !");

        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setEmail(request.getEmail());
        newUser.setPassword(bCryptPasswordEncoder.encode(request.getPassword()));
        newUser.setEnabled(false);
        userRep.save(newUser);

        // Default role: USER
        Role r = roleRep.findByRole("USER");
        List<Role> roles = new ArrayList<>();
        roles.add(r);
        newUser.setRoles(roles);
        userRep.save(newUser);

        // Generate 6-digit verification code
        String code = generateCode();
        VerificationToken token = new VerificationToken(code, newUser);
        verificationTokenRepo.save(token);

        // Send verification email
        sendEmailUser(newUser, token.getToken());

        return newUser;
    }

    @Override
    public User validateToken(String code) {
        VerificationToken token = verificationTokenRepo.findByToken(code);
        if (token == null)
            throw new InvalidTokenException("Code invalide !");

        Calendar calendar = Calendar.getInstance();
        if ((token.getExpirationTime().getTime() - calendar.getTime().getTime()) <= 0) {
            verificationTokenRepo.delete(token);
            throw new ExpiredTokenException("Code expiré !");
        }

        User user = token.getUser();
        user.setEnabled(true);
        userRep.save(user);
        return user;
    }

    public String generateCode() {
        Random random = new Random();
        Integer code = 100000 + random.nextInt(900000);
        return code.toString();
    }

    public void sendEmailUser(User u, String code) {
        String body = "Bonjour <h1>" + u.getUsername() + "</h1>"
                    + " Votre code de validation est <h1>" + code + "</h1>";
        emailSender.sendEmail(u.getEmail(), body);
    }
}
