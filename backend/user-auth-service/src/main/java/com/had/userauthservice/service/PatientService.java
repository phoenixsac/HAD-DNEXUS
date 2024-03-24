package com.had.userauthservice.service;

import com.had.userauthservice.constants.Constants;
import com.had.userauthservice.entities.Patient;
import com.had.userauthservice.entities.User;
import com.had.userauthservice.repository.PatientRepository;
import com.had.userauthservice.repository.UserRepository;
import com.had.userauthservice.requestBody.PatientSignupReqBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Optional;
import java.util.Random;
import java.util.UUID;

@Service
public class PatientService {

    @Autowired
    PatientRepository patientRepo;

    @Autowired
    UserRepository userRepo;

    @Autowired
    private EmailService emailService;

    @Autowired
    @Qualifier("bcrypt")
    private BCryptPasswordEncoder bcryptPwdEncoder;

    public String registerPatient(PatientSignupReqBody request) {
        try {
            // Check if a user with the same email already exists
            Optional<Patient> existingPatient = patientRepo.findByEmail(request.getEmail());

            if (existingPatient.isPresent()) {
                return "User already exists.";
            } else {
                // Generate random login ID and password
                String loginId = generateRandomLoginId(6);
                String password = generateRandomPassword(8);

                String hashedPassword = bcryptPwdEncoder.encode(password);

                // Save the patient entry to the User table
                User user = new User(
                        request.getFirstName() + " " + request.getLastName(),
                        loginId,
                        request.getEmail(),
                        hashedPassword,
                        "pat"
                );
                userRepo.save(user);

                Patient patient = new Patient.Builder()
                        .withFirstName(request.getFirstName())
                        .withLastName(request.getLastName())
                        .withDob(request.getDob())
                        .withGender(request.getGender())
                        .withContact(request.getContact())
                        .withEmail(request.getEmail())
                        .withAddress(request.getAddress())
                        .withBloodGrp(request.getBloodGrp())
                        .withGuardianFirstName(request.getGuardianFirstName())
                        .withGuardianLastName(request.getGuardianLastName())
                        .withGuardianContact(request.getGuardianContact())
                        .build();

                // Additional processing or validation if needed
                patientRepo.save(patient);

                // Send an email to the user with login credentials
//                String emailContent = "Thank you for registering on DNexus. Here are the credentials for future access. You can change the password" +
//                        " after you login with the initial credentials.\nYour login ID: " + loginId + "\nYour password: " + password;

                String emailContent = Constants.getPatientSignupCredEmail(loginId, password);
                emailService.sendEmail(request.getEmail(), "Login Credentials for DNexus", emailContent);

                return "success";
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Handle the exception properly
            return "error";
        }
    }



    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    private String generateRandomLoginId(int length) {
        StringBuilder loginId = new StringBuilder();
        Random random = new Random();

        // Generate random login ID by appending random characters from the CHARACTERS string
        for (int i = 0; i < length; i++) {
            int index = random.nextInt(CHARACTERS.length());
            loginId.append(CHARACTERS.charAt(index));
        }

        return loginId.toString();
    }
    private String generateRandomPassword(int length) {
        // Define the character set for generating the password
        String charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$";

        // Initialize StringBuilder to store the password
        StringBuilder password = new StringBuilder();

        // Generate random password by appending random characters from charset
        for (int i = 0; i < length; i++) {
            int index = (int) (Math.random() * charset.length());
            password.append(charset.charAt(index));
        }

        return password.toString();
    }
}
