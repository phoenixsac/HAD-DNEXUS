package com.had.userauthservice.config;


import com.had.userauthservice.utility.OTPCleanupTask;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;


@Configuration
class MyConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public OTPCleanupTask myComponent() {
        return new OTPCleanupTask(); // Instantiate your component class here
    }

    @Bean
    @Qualifier("bcrypt")
    public BCryptPasswordEncoder bcryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }


}