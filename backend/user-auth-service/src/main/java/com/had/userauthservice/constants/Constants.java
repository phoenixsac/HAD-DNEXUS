package com.had.userauthservice.constants;

public class Constants {

    public static String CONSENT_MAIL_SUBJECT = "Consent for Use of Personal Data in Teleradiology Platform";


    public static final String CONSENT_MESSAGE = "<html><body style=\"color: black;\">" +
            "<p>As part of the registration process for our teleradiology platform, we request your consent for the use of your personal data. Your privacy and trust are important to us, and we are committed to protecting your information.</p>" +
            "<p>By continuing, you agree that:</p>" +
            "<ul style=\"color: black;\">" +
            "<li>Your personal data will be securely collected and stored for the purpose of providing teleradiology services, including delivery and analysis of radiological reports.</li>" +
            "<li>Anonymized data may be used for research and statistical analysis, ensuring your privacy is maintained.</li>" +
            "<li>Your information will not be disclosed to third parties without your consent, except as required by law or for essential operational purposes.</li>" +
            "</ul>" +
            "<p>To proceed, please enter the OTP provided below in the designated field box on our platform.</p>" +
            "<p><b>Following OTP will be valid for 2 minutes.</b></p>" +
            "</body></html>";


    public static final String OTP_DELIVERY_MSG = "<h1 style=\"font-weight:bold; font-size:24px; text-align: center;\">Your OTP for email verification is: </h1>";


    public static String getPatientSignupCredEmail(String loginId, String password) {
        return "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" " +
                "content=\"width=device-width, initial-scale=1.0\"><title>Login Credentials</title><style>body " +
                "{font-family: Arial, sans-serif;text-align: center;}.container {max-width: 400px;margin: auto;padding: 20px;" +
                "border: 1px solid #ccc;border-radius: 5px;text-align: left;}.highlight {font-weight: bold;font-size: 18px;}" +
                ".message {color: black;}.title {color: black;}</style></head><body><div " +
                "class=\"container\"><h2 class=\"title\">Login Credentials for DNEXUS</h2><p class=\"message\">Thank you for registering on DNexus." +
                " Here are the credentials for future access. You can change the password after you login with the initial " +
                "credentials.</p><p><span class=\"highlight\">Login ID:</span> " +
                "<span style=\"font-size: 24px;\">" + loginId + "</span></p><p><span class=\"highlight\">Password:</span> " +
                "<span style=\"font-size: 24px;\">" + password + "</span></p></div></body></html>";
    }






}
