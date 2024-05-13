package com.had.coreservice.service;

import com.had.coreservice.constants.Constants;
import com.had.coreservice.entity.Consent;
import com.had.coreservice.entity.Token;
import com.had.coreservice.repository.TokenRepository;
import com.had.coreservice.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;
@Service
public class MailingService {

    private static final int TOKEN_LENGTH = 32;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    PatientRepository patientRepository;

    @Value("${spring.mail.username}")
    private String senderEmail;

    @Autowired
    TokenRepository tokenRepository;



    public void sendConsentEmail(Consent consent, String patientName, String entityName, Long patientId) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(senderEmail);

            Optional<String> patientEmailOptional = patientRepository.findPatientEmailByPatientId(patientId);
            String patientEmail = patientEmailOptional.orElseThrow(() -> new IllegalArgumentException("Patient email not found for ID: " + patientId));

            helper.setTo(patientEmail);

            helper.setSubject(Constants.SUB_DOCTOR_ACCESS_CONSENT);
            if("DOCTOR".equalsIgnoreCase(consent.getEntityType())) {
                helper.setSubject(Constants.SUB_DOCTOR_ACCESS_CONSENT);
            }
            else if("LAB".equalsIgnoreCase(consent.getEntityType())){
                helper.setSubject(Constants.SUB_LAB_ACCESS_CONSENT);
            }
            else {
                helper.setSubject(Constants.SUB_RADIOLOGIST_ACCESS_CONSENT);
            }
            helper.setText(buildEmailContent(consent, patientName, patientId), true);
            javaMailSender.send(message);
        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException(e);
        }
    }


//    private String buildEmailContent(Consent consent, String patientName) {
//        String link = "http://localhost:3000/core" + "/consents/" + consent.getId() + "/response";
//        String htmlContent = "<p>Dear " + patientName + ",</p><p>You have a new consent request. Please click <a href=\"" + link + "\">here</a> to respond.</p>";
//        return htmlContent;
//    }

    private String buildEmailContent(Consent consent, String patientName, Long patientId) {
        String token = generateTokenForVerification(patientId, consent); // Generate a token for the patient
        String link = "http://localhost:5000/core" + "/consents/" + consent.getId() + "/response?token=" + token;
        String htmlContent = "<p>Dear " + patientName + ",</p><p>You have a new consent request. Please click <a href=\"" + link + "\">here</a> to respond.</p>";
        return htmlContent;
    }

    private String generateTokenForVerification(Long patientId, Consent consent) {

        SecureRandom secureRandom = new SecureRandom();
        byte[] tokenBytes = new byte[TOKEN_LENGTH];
        secureRandom.nextBytes(tokenBytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);

        Token tokenEntity = new Token();
        tokenEntity.setToken(token);
        tokenEntity.setConsentId(consent.getId());
        tokenEntity.setPatientId(patientId);
        tokenEntity.setCreatedAt(LocalDateTime.now());
        tokenEntity.setExpirationTime(LocalDateTime.now().plusHours(1)); // Set expiration time (e.g., 1 hour from now)
        Token savedToken = tokenRepository.save(tokenEntity); // Save the token in the database

        return savedToken.getToken();
    }

    public static String generateToken() {
        SecureRandom secureRandom = new SecureRandom();
        byte[] tokenBytes = new byte[TOKEN_LENGTH];
        secureRandom.nextBytes(tokenBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
    }

//    private String buildEmailContentForLab(Consent consent) {
//        String link = "http://localhost:3000/core" + "/consents/" + consent.getId() + "/response";
//        String htmlContent = "<p>Dear Patient,</p><p>You have a new consent request. Please click <a href=\"" + link + "\">here</a> to respond.</p>";
//        return htmlContent;
//    }
//
//
//    private String buildEmailContentForRadiologist(Consent consent) {
//        String link = "http://localhost:3000/core" + "/consents/" + consent.getId() + "/response";
//        String htmlContent = "<p>Dear Patient,</p><p>You have a new consent request. Please click <a href=\"" + link + "\">here</a> to respond.</p>";
//        return htmlContent;
//    }

}