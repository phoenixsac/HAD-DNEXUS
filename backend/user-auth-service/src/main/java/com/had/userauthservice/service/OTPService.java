package com.had.userauthservice.service;

import com.had.userauthservice.entities.OTPValidation;
import com.had.userauthservice.repository.OTPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class OTPService {


    @Autowired
    private OTPRepository otpRepository;

    public String generateRandomOTP(int length) {
        String numbers = "0123456789";
        Random random = new Random();
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < length; i++) {
            otp.append(numbers.charAt(random.nextInt(numbers.length())));
        }
        return otp.toString();
    }


    public String generateOTP(String email, int length) {
        String otp = generateRandomOTP(length);
        LocalDateTime expirationTime = LocalDateTime.now().plusMinutes(2); // Example: OTP expires in 10 minutes
        OTPValidation otpValidation = new OTPValidation(email, otp, expirationTime);
        otpRepository.save(otpValidation);
        return otp;
    }


    public String validateOTP(String email, String userEnteredOTP) {
        Optional<OTPValidation> otpValidationOptional = otpRepository.findLatestByEmail(email);
        if (otpValidationOptional.isPresent()) {
            OTPValidation otpValidation = otpValidationOptional.get();

            // Check if OTP has expired
            LocalDateTime currentTime = LocalDateTime.now();
            LocalDateTime otpExpirationTime = otpValidation.getExpirationTime();
            if (currentTime.isAfter(otpExpirationTime)) {
                // OTP has expired
                return "Otp expired";
            }

            if(otpValidation.getOtp().equals(userEnteredOTP))
                return "Otp valid";
        }
        return "Otp invalid";
    }


//    public boolean validateOTP(String email, String userEnteredOTP) {
//        // OTPValidation otpValidationObj = otpRepository.findLatestByEmail(email);
//        Optional<OTPValidation> otpValidationOptional = otpRepository.findLatestByEmail(email);
//        if (otpValidationObj!=null) {
//            //OTPValidation otpValidation = otpValidationOptional.get();
//            return otpValidationObj.getOtp().equals(userEnteredOTP);
//        }
//        return false;
//    }

}
