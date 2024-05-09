package com.had.coreservice.service;

import com.had.coreservice.entity.Consent;
import com.had.coreservice.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import javax.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.util.Optional;

@Service
public class MailingService {

    public String SUB_DOCTOR_ACCESS_CONSENT = "Doctor's Consent Access Request";

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    PatientRepository patientRepository;

    @Value("${spring.mail.username}")
    private String senderEmail;



    public void sendConsentEmail(Consent consent, String patientName, String docName, Long patientId) {
        MimeMessage message = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom(senderEmail);

            Optional<String> patientEmailOptional = patientRepository.findPatientEmailByUserId(patientId);
            String patientEmail = patientEmailOptional.orElseThrow(() -> new IllegalArgumentException("Patient email not found for ID: " + patientId));

            helper.setTo(patientEmail);
            helper.setSubject(SUB_DOCTOR_ACCESS_CONSENT);
            helper.setText(buildEmailContent(consent), true);
            javaMailSender.send(message);
        } catch (jakarta.mail.MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    private String buildEmailContent(Consent consent) {
        String link = "http://localhost:3000/core" + "/consents/" + consent.getId() + "/response";
        String htmlContent = "<p>Dear Patient,</p><p>You have a new consent request. Please click <a href=\"" + link + "\">here</a> to respond.</p>";
        return htmlContent;
    }
}