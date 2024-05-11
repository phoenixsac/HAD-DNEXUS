package com.had.coreservice.service;

import com.had.coreservice.entity.Token;
import com.had.coreservice.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class TokenService {

    @Autowired
    private TokenRepository tokenRepository; // Assuming you have a TokenRepository injected

    public ResponseEntity<String> validateTokenByConsentId(Long consentId) {
        try {
            Optional<Token> tokenOptional = tokenRepository.getTokenByConsentId(consentId);
            if (tokenOptional.isPresent()) {
                Token token = tokenOptional.get();
                // Check if the token is expired
                if (token.getExpirationTime().isBefore(LocalDateTime.now())) {
                    return ResponseEntity.badRequest().body("Token has expired");
                }
                // Token is valid
                return ResponseEntity.ok("Token is valid");
            } else {
                // Token not found
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            // Log the exception
            e.printStackTrace();
            // Return an internal server error response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request");
        }
    }
}
