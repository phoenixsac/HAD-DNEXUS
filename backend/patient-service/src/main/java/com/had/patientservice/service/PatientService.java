package com.had.patientservice.service;

import com.had.patientservice.entity.Patient;
import com.had.patientservice.entity.User;
import com.had.patientservice.repository.PatientRepository;
import com.had.patientservice.repository.UserRepository;
import com.had.patientservice.requestBody.UpdatePatientReqBody;
import com.had.patientservice.requestBody.UpdatePatientRespBody;
import com.had.patientservice.responseBody.ConsultationCardDetailResponseBody;
import com.had.patientservice.responseBody.PatientDetailsRespBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PatientService
{

    @Autowired
    PatientRepository patientRepo;

    @Autowired
    UserRepository userRepo;

    private static final Logger logger = LoggerFactory.getLogger(PatientService.class);

    public Object getDetailsFromMailId(String email) {
        Patient patient = patientRepo.findByEmailId(email);
        if (patient == null)
            return "Invalid!!!";
        else {
            return PatientDetailsRespBody.builder()
                    .dob(patient.getDob())
                    .age(patient.getAge())
                    .address(patient.getAddress())
                    .bloodGrp(patient.getBloodGrp())
                    .contact(patient.getContact())
                    .firstName(patient.getFirstName())
                    .lastName(patient.getLastName())
                    .guardianFirstName(patient.getGuardianFirstName())
                    .guardianLastName(patient.getGuardianLastName())
                    .email(email)
                    .gender(patient.getGender()).build();
        }
    }

    @Transactional
    public UpdatePatientRespBody updatePatientDetails(UpdatePatientReqBody requestBody) {
        logger.info("Updating patient details for email: {}", requestBody.getEmail());
        // Fetch the existing patient from the database
        Patient existingPatient = patientRepo.findByEmailId(requestBody.getEmail());

        if (existingPatient!=null) {
            // Update fields of the existing patient
            existingPatient.setFirstName(requestBody.getFirstName());
            existingPatient.setLastName(requestBody.getLastName());
            existingPatient.setDob(requestBody.getDob());
            existingPatient.setGender(requestBody.getGender());
            existingPatient.setContact(requestBody.getContact());
            existingPatient.setEmail(requestBody.getEmail());
            existingPatient.setAddress(requestBody.getAddress());
            existingPatient.setBloodGrp(requestBody.getBloodGrp());
            existingPatient.setGuardianFirstName(requestBody.getGuardianFirstName());
            existingPatient.setGuardianLastName(requestBody.getGuardianLastName());
            existingPatient.setGuardianContact(requestBody.getGuardianContact());

            User existingUser = userRepo.findByEmail(requestBody.getEmail());
            if (existingUser != null) {
                logger.info("Modified first name and last name : ", requestBody.getEmail(), existingUser.getName());
                existingUser.setName(requestBody.getFirstName() + " " + requestBody.getLastName());
                userRepo.save(existingUser);

                logger.info("User details updated successfully for email: {}, New Name: {}", requestBody.getEmail(), existingUser.getName());
            }

            logger.debug("Patient details updated for email: {}", requestBody.getEmail());

            // Persist the updated patient entity
            Patient updatedPatient = patientRepo.save(existingPatient);

            // Construct the response body from the updated patient details
            UpdatePatientRespBody responseBody = new UpdatePatientRespBody();
            responseBody.setFirstName(updatedPatient.getFirstName());
            responseBody.setLastName(updatedPatient.getLastName());
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

    public List<ConsultationCardDetailResponseBody> getConsultationDetailsByPatientId(Long patientId) {
        List<Object[]> consultationObjects = patientRepo.findConsultationsByPatientId(patientId);
        return consultationObjects.stream()
                .map(this::mapToConsultationCardDetail)
                .collect(Collectors.toList());
    }

    private ConsultationCardDetailResponseBody mapToConsultationCardDetail(Object[] row) {
        ConsultationCardDetailResponseBody consultationCardDetail = new ConsultationCardDetailResponseBody();
        consultationCardDetail.setConsultationId((Long) row[0]);
        consultationCardDetail.setName((String) row[1]);
        // Set other properties accordingly
        return consultationCardDetail;
    }


}
