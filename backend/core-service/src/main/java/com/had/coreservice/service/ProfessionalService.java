package com.had.coreservice.service;

import com.had.coreservice.entity.Consultation;
import com.had.coreservice.entity.Patient;
import com.had.coreservice.entity.Professional;
import com.had.coreservice.repository.ConsultationRepository;
import com.had.coreservice.repository.ProfessionalRepository;
import com.had.coreservice.repository.UserRepository;
import com.had.coreservice.responseBody.ConsultationCardDetailResponseBody;
import com.had.coreservice.responseBody.PatientCardDetailResponseBody;
import com.had.coreservice.responseBody.ProfessionalRadiologistResponseBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.sql.Timestamp;


@Service
public class ProfessionalService {


    @Autowired
    ProfessionalRepository professionalRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ConsultationRepository consultationRepository;

    private static final Logger logger = LoggerFactory.getLogger(ProfessionalService.class);

    @Transactional(readOnly = true)
    public List<ProfessionalRadiologistResponseBody> getRadiologists() {
        try {
            return professionalRepository.findBySpecializationIgnoreCase("radiologist").stream()
                    .map(professional -> ProfessionalRadiologistResponseBody.builder()
                            .id(professional.getId())
                            .fullName(userRepository.findFullNameById(professional.getUser().getId()))
                            .build())
                    .collect(Collectors.toList());
        } catch (DataAccessException ex) {
            // Handle database access exception
            throw new RuntimeException("Error occurred while fetching radiologists", ex);
        } catch (Exception ex) {
            // Handle other exceptions
            throw new RuntimeException("An unexpected error occurred", ex);
        }
    }

    @Transactional
    public void addRadiologistToConsultation(Long consultationId, Long proRadiologistId) {
        Consultation consultation = consultationRepository.findById(consultationId).orElseThrow(() -> new IllegalArgumentException("Consultation with given id does not exist"));
        Professional professional = professionalRepository.findById(proRadiologistId).orElseThrow(() -> new IllegalArgumentException("Professional with given id does not exist"));

        // Check if the professional is a radiologist
        if (!"radiologist".equalsIgnoreCase(professional.getSpecialization())) {
            throw new IllegalArgumentException("Only professional of type radiologist can be added to the consultation");
        }

        consultation.getProfessionals().add(professional);
        consultationRepository.save(consultation);
    }

    public List<PatientCardDetailResponseBody> getPatientCardDetailsByDoctor(Long docId) {
        logger.info("Fetching patient card details for doctor with ID: {}", docId);

        Professional professional = professionalRepository.findById(docId)
                .orElseThrow(() -> new RuntimeException("Professional not found with ID: " + docId));

        if (!"Doctor".equalsIgnoreCase(professional.getSpecialization())) {
            logger.error("Professional with ID {} is not a doctor", docId);
            throw new RuntimeException("Professional is not a doctor");
        }

        List<Object[]> patientDetails = professionalRepository.findPatientDetailsByProfessionalId(docId);

        List<PatientCardDetailResponseBody> patientCardDetails = patientDetails.stream()
                .map(this::mapToPatientCardDetail)
                .distinct()
                .collect(Collectors.toList());

        logger.info("Fetched {} patient card details for doctor with ID: {}", patientCardDetails.size(), docId);
        return patientCardDetails;
    }

    private PatientCardDetailResponseBody mapToPatientCardDetail(Object[] row) {
        PatientCardDetailResponseBody patientCardDetail = new PatientCardDetailResponseBody();
        // Assuming the order of values returned from the query is: patientId, firstName, lastName, gender, age, bloodGroup, contact
        patientCardDetail.setId((Long) row[0]);
        patientCardDetail.setName((String) row[1] + " " + (String) row[2]);
        patientCardDetail.setGender((String) row[3]);
        patientCardDetail.setAge((Integer) row[4]);
        patientCardDetail.setBloodGroup((String) row[5]);
        patientCardDetail.setContact((String) row[6]);
        return patientCardDetail;
    }


    public List<ConsultationCardDetailResponseBody> getConsultationCardDetails(Long docId, Long patientId) {
        Professional professional = professionalRepository.findById(docId)
                .orElseThrow(() -> new RuntimeException("Professional not found with ID: " + docId));

        List<Object[]> consultationDetails = professionalRepository.findConsultationDetailsByProfessionalIdAndPatientId(docId, patientId);

        List<ConsultationCardDetailResponseBody> consultationCardDetails = consultationDetails.stream()
                .map(this::mapToConsultationCardDetail)
                .collect(Collectors.toList());

        return consultationCardDetails;
    }

    private ConsultationCardDetailResponseBody mapToConsultationCardDetail(Object[] row) {
        ConsultationCardDetailResponseBody consultationCardDetail = new ConsultationCardDetailResponseBody();
        consultationCardDetail.setConsultationId((Long) row[0]);
        consultationCardDetail.setName((String) row[1]);

        // Convert java.sql.Timestamp to LocalDateTime
        Timestamp timestamp = (Timestamp) row[2];
        LocalDateTime localDateTime = timestamp.toLocalDateTime();
        consultationCardDetail.setDateCreated(localDateTime);

        consultationCardDetail.setStatus((String) row[3]);
        return consultationCardDetail;
    }




    public List<ConsultationCardDetailResponseBody> getConsultationCardDetailsByRadiologist(Long radiologistId) {
        List<Object[]> consultationObjects = professionalRepository.findConsultationDetailsByProfessionalId(radiologistId);
        List<ConsultationCardDetailResponseBody> consultationDetails = new ArrayList<>();

        for (Object[] obj : consultationObjects) {
            Long consultationId = (Long) obj[0];
            String name = (String) obj[1];
            LocalDateTime dateCreated = ((Timestamp) obj[2]).toLocalDateTime();
            String status = (String) obj[3];

            // Create ConsultationCardDetailResponseBody instance
            ConsultationCardDetailResponseBody responseBody = new ConsultationCardDetailResponseBody();
            responseBody.setConsultationId(consultationId);
            responseBody.setName(name);
            responseBody.setDateCreated(dateCreated);
            responseBody.setStatus(status);

            consultationDetails.add(responseBody);
        }

        return consultationDetails;
    }




}
