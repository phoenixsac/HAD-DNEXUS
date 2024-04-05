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

import static com.had.userauthservice.constants.Constants.PATIENT;

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
            User existingUser = userRepo.findByEmail(request.getEmail());

            if (existingUser != null) {
                return "Patient is already registered.";
            } else {
                String loginId = generateRandomLoginId(6);
                String password = generateRandomPassword(8);
                String hashedPassword = bcryptPwdEncoder.encode(password);

                // Create a new user entity
                User user = User.builder()
                        .email(request.getEmail())
                        .firstName(request.getFirstName())
                        .lastName(request.getLastName())
                        .contact(request.getContact())
                        .loginId(loginId)
                        .isActive(true)
                        .password(hashedPassword)
                        .type(PATIENT)
                        .build();

                // Create a new patient entity and associate it with the user
                Patient patient = Patient.builder()
//                        .firstName(request.getFirstName())
//                        .lastName(request.getLastName())
                        .dob(request.getDob())
                        .gender(request.getGender())
                        .address(request.getAddress())
                        .bloodGrp(request.getBloodGrp())
                        .guardianFirstName(request.getGuardianFirstName())
                        .guardianLastName(request.getGuardianLastName())
                        .guardianContact(request.getGuardianContact())
                        .user(user) // Associate patient with the user
                        .build();

                // Save the user along with associated patient

                patientRepo.save(patient);
                //userRepo.save(user);

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
