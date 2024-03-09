package com.had.userauthservice.controllers;

import com.had.userauthservice.constants.CustomHttpStatusCodes;
import com.had.userauthservice.service.EmailService;
import com.had.userauthservice.service.OTPService;
import com.had.userauthservice.utility.Common;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import javax.mail.MessagingException;
import static com.had.userauthservice.constants.Constants.*;

@RestController
public class OTPController {

    @Autowired
    private OTPService otpService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private Common common;


    @PostMapping("/send-otp")
    public ResponseEntity<String> sendOTP(@RequestParam String email) {

        if (email == null || email.isEmpty()) {
            return new ResponseEntity<>("Email is required", HttpStatusCode.valueOf(CustomHttpStatusCodes.EMAIL_EMPTY));
        }

        if (common.isValidEmail(email)) {
            String otp = otpService.generateOTP(email, 6);
            String subject = CONSENT_MAIL_SUBJECT;
            String formattedOtp = "<h1 style=\"font-weight:bold; font-size:30px; text-align: center;\">" + otp + "</h1>";
            String text = CONSENT_MESSAGE+OTP_DELIVERY_MSG+formattedOtp;
            try {
                emailService.sendEmail(email, subject, text);
                return new ResponseEntity<>("OTP sent successfully", HttpStatus.OK);
            } catch (MessagingException e) {
                return new ResponseEntity<>("Otp could not be sent", HttpStatus.INTERNAL_SERVER_ERROR);
            } catch (jakarta.mail.MessagingException e) {
                throw new RuntimeException(e);
            }
        } else {
            return new ResponseEntity<>("Invalid email format", HttpStatusCode.valueOf(CustomHttpStatusCodes.INVALID_EMAIL_FORMAT));
        }
    }


    @PostMapping("/validate-otp")
    public ResponseEntity<String> validateOTP(@RequestParam String email, @RequestParam String userEnteredOTP) {

        if (userEnteredOTP == null || userEnteredOTP.isEmpty()) {
            return new ResponseEntity<>("Otp is required", HttpStatusCode.valueOf(CustomHttpStatusCodes.OTP_EMPTY));
        }

        if (common.isValidSixDigitOTP(userEnteredOTP)) {

            String otpValidationMsg = otpService.validateOTP(email, userEnteredOTP);

            if (otpValidationMsg.equals("Otp valid")) {
                return new ResponseEntity<>("OTP valid", HttpStatus.OK);
            } else if (otpValidationMsg.equals("Otp expired")) {
                return new ResponseEntity<>("Otp expired, try again", HttpStatusCode.valueOf(CustomHttpStatusCodes.OTP_EXPIRED));
            } else {
                return new ResponseEntity<>("Invalid otp, validation unsuccessful", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Invalid otp format", HttpStatusCode.valueOf(CustomHttpStatusCodes.OTP_FORMAT_INVALID));

        }
    }
}
