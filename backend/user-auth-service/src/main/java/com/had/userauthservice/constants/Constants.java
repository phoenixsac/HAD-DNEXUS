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


}
