//package com.had.coreservice.utility;
//import jakarta.persistence.Column;
//
//import java.security.SecureRandom;
//import java.util.Base64;
//
//@Column
//public class TokenGenerator {
//
//    private static final int TOKEN_LENGTH = 32; // Length of the token in bytes
//
//    public static String generateToken() {
//        SecureRandom secureRandom = new SecureRandom();
//        byte[] tokenBytes = new byte[TOKEN_LENGTH];
//        secureRandom.nextBytes(tokenBytes);
//        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
//    }
//
//}
