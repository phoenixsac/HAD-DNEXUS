package com.had.userauthservice.utility;

import org.springframework.stereotype.Component;

@Component
public class Common {

    public boolean isValidEmail(String email) {
        // Regular expression for validating an email address
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }

    public boolean isValidSixDigitOTP(String otp) {
        // Check if the OTP is exactly 6 characters long and contains only digits
        return otp != null && otp.matches("\\d{6}");
    }
}
