package com.had.userauthservice.controllers;

import com.had.userauthservice.requestBody.LoginRequest;
import com.had.userauthservice.requestBody.PatientSignupReqBody;
import com.had.userauthservice.responseBody.LoginResponse;
import com.had.userauthservice.entities.User;
import com.had.userauthservice.service.JwtHelper;
import com.had.userauthservice.service.UserServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.had.userauthservice.exception.UserNotFoundException;
import com.had.userauthservice.exception.UserUnauthorizedException;
import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
public class AuthController {

    @Autowired
    private UserServiceImpl userService;


    @Autowired
    private AuthenticationManager manager;


    @Autowired
    private JwtHelper helper;

    @Autowired
    PasswordEncoder passwordEncoder;

    private Logger logger = LoggerFactory.getLogger(AuthController.class);


    @PostMapping("/auth/issue-jwt")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) throws UserUnauthorizedException, UserNotFoundException {
        try {
            User user;
            this.doAuthenticate(request.getEmail(),request.getPassword(), request.getType());
            user = userService.loadUserByUsername(request.getEmail());

            if(userService.validateByType(user, request.getType())) {
                logger.info("checking get with jwt");
                String token = this.helper.generateToken(user, user.getType(), user.getEmail());

                LoginResponse response = LoginResponse.builder()
                        .jwtToken(token)
                        .username(user.getUsername()).build();
                return new ResponseEntity<>(response, HttpStatus.OK);
            }
            else
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    private void doAuthenticate(String email, String password, String type) {

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
        try {
            manager.authenticate(authentication);

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException(" Invalid Username or Password  !!");
        }

    }

    @ExceptionHandler(BadCredentialsException.class)
    public String exceptionHandler() {
        return "Credentials Invalid !!";
    }
}
