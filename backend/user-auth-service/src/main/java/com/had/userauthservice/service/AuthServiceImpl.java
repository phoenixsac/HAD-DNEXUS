//package com.had.userauthservice.service;
//
//import com.had.userauthservice.entities.User;
//import com.had.userauthservice.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Service;
//
//@Service
//public class AuthServiceImpl {
//
//    @Autowired
//    public AuthServiceImpl(UserRepository userRepo) {
//        this.userRepo = userRepo;
//    }
//
//
//    @Override
//    public User loadUserByUsername(String email) {
//        user=userRepo.findByEmail(email);
//        return user;
//    }
//}
