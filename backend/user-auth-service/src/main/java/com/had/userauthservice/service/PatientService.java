package com.had.userauthservice.service;

import com.had.userauthservice.entities.Patient;
import com.had.userauthservice.entities.User;
import com.had.userauthservice.repository.PatientRepository;
import com.had.userauthservice.requestBody.PatientSignupReqBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    PatientRepository patientRepo;

    public String registerPatient(PatientSignupReqBody request) {
        try {
            // Check if a user with the same email already exists
            Optional<Patient> existingPatient = patientRepo.findByEmail(request.getEmail());

            if (existingPatient.isPresent()) {
                return "User already exists.";
            } else {
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
                return "success";
            }
        } catch (Exception ex) {
            ex.printStackTrace(); // Handle the exception properly
            return "error";
        }
    }


}
