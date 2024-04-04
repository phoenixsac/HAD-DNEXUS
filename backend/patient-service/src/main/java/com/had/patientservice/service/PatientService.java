package com.had.patientservice.service;

import com.had.patientservice.entity.Patient;
import com.had.patientservice.entity.User;
import com.had.patientservice.repository.PatientRepository;
import com.had.patientservice.repository.UserRepository;
import com.had.patientservice.requestBody.UpdatePatientReqBody;
import com.had.patientservice.requestBody.UpdatePatientRespBody;
import com.had.patientservice.responseBody.PatientDetailsRespBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.Optional;

@Service
public class PatientService
{

    @Autowired
    PatientRepository patientRepo;

    @Autowired
    UserRepository userRepo;

    private static final Logger logger = LoggerFactory.getLogger(PatientService.class);

    public Object getDetailsFromId(Long id) {
        Patient patient = patientRepo.findByPatientId(id);
        if (patient == null)
            return "Invalid!!!";
        else {
            return PatientDetailsRespBody.builder()
                    .dob(patient.getDob())
                    .age(patient.getAge())
                    .address(patient.getAddress())
                    .bloodGrp(patient.getBloodGrp())
                    .contact(patient.getContact())
                    .firstName(patient.getUser().getFirstName())
                    .lastName(patient.getUser().getLastName())
                    .guardianFirstName(patient.getGuardianFirstName())
                    .guardianLastName(patient.getGuardianLastName())
                    .email(patient.getUser().getEmail())
                    .gender(patient.getGender()).build();
        }
    }

    @Transactional
    public UpdatePatientRespBody updatePatientDetails(UpdatePatientReqBody requestBody) {
        logger.info("Updating patient details for id: {}", requestBody.getId());
        // Fetch the existing patient from the database
        Patient existingPatient = patientRepo.findByPatientId(requestBody.getId());

        if (existingPatient!=null) {
            // Update fields of the existing patient
//            existingPatient.setFirstName(requestBody.getFirstName());
//            existingPatient.setLastName(requestBody.getLastName());
            existingPatient.setDob(requestBody.getDob());
            existingPatient.setGender(requestBody.getGender());
            existingPatient.setContact(requestBody.getContact());
            existingPatient.setEmail(requestBody.getEmail());
            existingPatient.setAddress(requestBody.getAddress());
            existingPatient.setBloodGrp(requestBody.getBloodGrp());
            existingPatient.setGuardianFirstName(requestBody.getGuardianFirstName());
            existingPatient.setGuardianLastName(requestBody.getGuardianLastName());
            existingPatient.setGuardianContact(requestBody.getGuardianContact());

            User existingUser = userRepo.findByUserId(requestBody.getId());
            if (existingUser != null) {
                logger.info("Modified first name and last name : ", requestBody.getEmail(), existingUser.getFirstName());
                existingUser.setFirstName(requestBody.getFirstName() + " " + requestBody.getLastName());
                userRepo.save(existingUser);

                logger.info("User details updated successfully for email: {}, New Name: {}", requestBody.getEmail(), existingUser.getFirstName());
            }

            logger.debug("Patient details updated for email: {}", requestBody.getEmail());

            // Persist the updated patient entity
            Patient updatedPatient = patientRepo.save(existingPatient);

            // Construct the response body from the updated patient details
            UpdatePatientRespBody responseBody = new UpdatePatientRespBody();
//            responseBody.setFirstName(updatedPatient.getFirstName());
//            responseBody.setLastName(updatedPatient.getLastName());
            responseBody.setDob(updatedPatient.getDob());
            responseBody.setGender(updatedPatient.getGender());
            responseBody.setContact(updatedPatient.getContact());
            responseBody.setEmail(updatedPatient.getEmail());
            responseBody.setAddress(updatedPatient.getAddress());
            responseBody.setBloodGrp(updatedPatient.getBloodGrp());
            responseBody.setGuardianFirstName(updatedPatient.getGuardianFirstName());
            responseBody.setGuardianLastName(updatedPatient.getGuardianLastName());
            responseBody.setGuardianContact(updatedPatient.getGuardianContact());

            logger.info("Patient details updated successfully for email: {}", requestBody.getEmail());
            return responseBody;
        } else {
            // Handle case where patient with given ID is not found
            throw new RuntimeException("Patient with email " + requestBody.getEmail() + " not found.");
        }
    }


}
