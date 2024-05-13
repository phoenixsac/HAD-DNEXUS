package com.had.coreservice.service;

import com.had.coreservice.entity.*;
import com.had.coreservice.repository.ConsentRepository;
import com.had.coreservice.repository.ConsultationRepository;
import com.had.coreservice.repository.ProfessionalRepository;
import com.had.coreservice.repository.UserRepository;
import com.had.coreservice.responseBody.ConsultationCardDetailResponseBody;
import com.had.coreservice.responseBody.DoctorDetailResponseBody;
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
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.sql.Timestamp;


@Service
public class ProfessionalService {


    @Autowired
    ProfessionalRepository professionalRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ConsentRepository consentRepository;

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

//    @Transactional
//    public void addRadiologistToConsultation(Long consultationId, Long proRadiologistId) {
//        Consultation consultation = consultationRepository.findById(consultationId).orElseThrow(() -> new IllegalArgumentException("Consultation with given id does not exist"));
//        Professional professional = professionalRepository.findById(proRadiologistId).orElseThrow(() -> new IllegalArgumentException("Professional with given id does not exist"));
//
//        // Check if the professional is a radiologist
//        if (!"radiologist".equalsIgnoreCase(professional.getSpecialization())) {
//            throw new IllegalArgumentException("Only professional of type radiologist can be added to the consultation");
//        }
//
//        consultation.getProfessionals().add(professional);
//        consultationRepository.save(consultation);
//    }

//    @Transactional
//    public void addRadiologistToConsultation(Long consultationId, Long proRadiologistId) {
//        Consultation consultation = consultationRepository.findById(consultationId)
//                .orElseThrow(() -> new IllegalArgumentException("Consultation with given id does not exist"));
//
//        // Check if a radiologist is already added to the consultation
//        if (isRadiologistAlreadyAdded(consultation, proRadiologistId)) {
//            throw new IllegalArgumentException("A radiologist has already been added to this consultation");
//        }
//
//        Professional professional = professionalRepository.findById(proRadiologistId)
//                .orElseThrow(() -> new IllegalArgumentException("Professional with given id does not exist"));
//
//        // Check if the professional is a radiologist
//        if (!"radiologist".equalsIgnoreCase(professional.getSpecialization())) {
//            throw new IllegalArgumentException("Only professional of type radiologist can be added to the consultation");
//        }
//
//        consultation.getProfessionals().add(professional);
//        consultationRepository.save(consultation);
//    }

    @Transactional
    public void addRadiologistToConsultation(Long consultationId, Long proRadiologistId) {
        Consultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new IllegalArgumentException("Consultation with given id does not exist"));


//        validateNumberOfRadiologistAlreadyAddedWithAcceptConsentStatus(consultation);

//        if (isRadiologistAlreadyAdded(consultation)) {
//            throw new IllegalArgumentException("A radiologist has already been added to this consultation");
//        }

        if(consultationRepository.countByConsultationIdAndConsentStatus(consultationId)==2){

        }

        Professional professional = professionalRepository.findById(proRadiologistId)
                .orElseThrow(() -> new IllegalArgumentException("Professional with given id does not exist"));

        if (!"radiologist".equalsIgnoreCase(professional.getSpecialization())) {
            throw new IllegalArgumentException("Only professional of type radiologist can be added to the consultation");
        }

        consultation.getProfessionals().add(professional);
        consultationRepository.save(consultation);
    }





//    private void validateNumberOfRadiologistAlreadyAddedWithAcceptConsentStatus(Consultation consultation) {
//        for (Professional professional : consultation.getProfessionals()) {
//            if (professional.getId().equals(proRadiologistId)) {
//                throw new IllegalArgumentException("The radiologist is already part of this consultation");
//            }
//        }
//    }

    private boolean isRadiologistAlreadyAdded(Consultation consultation) {
        return !consultation.getProfessionals().isEmpty();
    }


//    private boolean isRadiologistAlreadyAdded(Consultation consultation, Long consultationId) {
//        return consultation.getProfessionals().stream()
//                .anyMatch(professional -> professional.getConsultationId().equals(consultationId));
//    }


//    private boolean isRadiologistAlreadyAdded(Consultation consultation, Long proRadiologistId) {
//        return consultation.getProfessionals().stream()
//                .anyMatch(professional -> professional.getId().equals(proRadiologistId) && "radiologist".equalsIgnoreCase(professional.getSpecialization()));
//    }
//
//    private boolean isRadiologistAlreadyAdded(Consultation consultation, Long proRadiologistId) {
//        return consultation.getProfessionals().stream()
//                .anyMatch(professional -> professional.getId().equals(proRadiologistId) && "radiologist".equalsIgnoreCase(professional.getSpecialization()));
//    }

//    @Transactional
//    public boolean addRadiologistToConsultation(Long consultationId, Long proRadiologistId) {
//        Consultation consultation = consultationRepository.findById(consultationId)
//                .orElseThrow(() -> new IllegalArgumentException("Consultation with given id does not exist"));
//
//        if (isRadiologistAlreadyAdded(consultation, proRadiologistId)) {
//            return false;
//        }
//
//        Professional professional = professionalRepository.findById(proRadiologistId)
//                .orElseThrow(() -> new IllegalArgumentException("Professional with given id does not exist"));
//
//        // Check if the professional is a radiologist
//        if (!"radiologist".equalsIgnoreCase(professional.getSpecialization())) {
//            throw new IllegalArgumentException("Only professional of type radiologist can be added to the consultation");
//        }
//
//        consultation.getProfessionals().add(professional);
//        consultationRepository.save(consultation);
//        return true;
//    }
//
//    private boolean isRadiologistAlreadyAdded(Consultation consultation, Long proRadiologistId) {
//        return consultation.getProfessionals().stream()
//                .anyMatch(professional -> professional.getId().equals(proRadiologistId) && "radiologist".equalsIgnoreCase(professional.getSpecialization()));
//    }

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
                .map(detail -> {
                    Long consultationId = (Long) detail[0];
                    String name = (String) detail[1];
//                    LocalDateTime dateCreated = (LocalDateTime) detail[2];
                    Timestamp timestamp = (Timestamp) detail[2];
                    LocalDateTime dateCreated = timestamp.toLocalDateTime();

                    String status = (String) detail[3];

                    // Get consent status
                    Consent consent = consentRepository.findByConsultationIdAndEntityIdAndEntityTypeIgnoreCase(consultationId, docId, "DOCTOR");
                    if (consent == null) {
                        throw new RuntimeException("Consent not found for consultation ID: " + consultationId + " and professional ID: " + docId);
                    }

                    // Create response body
                    ConsultationCardDetailResponseBody responseBody = new ConsultationCardDetailResponseBody();
                    responseBody.setConsultationId(consultationId);
                    responseBody.setName(name);
//                    responseBody.setConsentEntityType(consent.getEntityType());
                    responseBody.setDateCreated(dateCreated);

                    LocalDateTime consentExpiry = consent.getConsentExpiry();
//                    if (consentExpiry != null && LocalDateTime.now().isAfter(consentExpiry)) {
//                        responseBody.setConsentStatus("TIMEOUT");
//                    }
//                    else{
//                        responseBody.setConsentStatus(String.valueOf(consent.getConsentStatus()));
//                    }
                    responseBody.setStatus(status);
//                    responseBody.setConsentType(consent.getConsentType());

                    return responseBody;
                })
                .collect(Collectors.toList());

        return consultationCardDetails;
    }




//    public List<ConsultationCardDetailResponseBody> getConsultationCardDetails(Long docId, Long patientId) {
//        Professional professional = professionalRepository.findById(docId)
//                .orElseThrow(() -> new RuntimeException("Professional not found with ID: " + docId));
//
//        List<Object[]> consultationDetails = professionalRepository.findConsultationDetailsByProfessionalIdAndPatientId(docId, patientId);
//
//
//
//        List<ConsultationCardDetailResponseBody> consultationCardDetails = consultationDetails.stream()
//                .map(this::mapToConsultationCardDetail)
//                .collect(Collectors.toList());
//
//        return consultationCardDetails;
//    }
//    public List<Consent> findConsentsByTypeAndConsultationId(String consentType, Long consultationId) {
//        return consentRepository.findByConsentTypeAndConsultationId(consentType, consultationId);
//    }

    private ConsultationCardDetailResponseBody mapToConsultationCardDetail(Object[] row) {
//        Consent consentObj = new Consent();

//        consentRepository.findConsentStatusByConsultationIdAndType((Long) row[0], "DOCTOR_CASE_CONSENT");
//        List<Consent> consentObj = findConsentsByTypeAndConsultationId("DOCTOR_CASE_CONSENT", (Long) row[0]);


        ConsultationCardDetailResponseBody consultationCardDetail = new ConsultationCardDetailResponseBody();
        consultationCardDetail.setConsultationId((Long) row[0]);
        consultationCardDetail.setName((String) row[1]);

        // Convert java.sql.Timestamp to LocalDateTime
        Timestamp timestamp = (Timestamp) row[2];
        LocalDateTime localDateTime = timestamp.toLocalDateTime();
        consultationCardDetail.setDateCreated(localDateTime);
//        consultationCardDetail.setConsentType("DOCTOR_CASE_CONSENT");
//        consultationCardDetail.setStatus(consentObj.);

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


//            Consent consent = consentRepository.findByConsultationIdAndEntityIdAndEntityTypeIgnoreCase(consultationId, radiologistId, "RADIOLOGIST");
//            if (consent == null) {
//                throw new RuntimeException("Consent not found for consultation ID: " + consultationId + " and professional ID: " + radiologistId);
//            }

            // Create ConsultationCardDetailResponseBody instance
            ConsultationCardDetailResponseBody responseBody = new ConsultationCardDetailResponseBody();
            responseBody.setConsultationId(consultationId);
            responseBody.setName(name);
            responseBody.setDateCreated(dateCreated);
            responseBody.setStatus(status);
//            responseBody.setConsentType(consent.getConsentType());

//            LocalDateTime consentExpiry = consent.getConsentExpiry();
//            if ("NONE".equalsIgnoreCase(String.valueOf(consent.getConsentStatus())) && consentExpiry != null && LocalDateTime.now().isAfter(consentExpiry)) {
//                responseBody.setConsentStatus("TIMEOUT");
//            }
//            else{
//                responseBody.setConsentStatus(String.valueOf(consent.getConsentStatus()));
//            }
//            responseBody.setConsentEntityType(consent.getEntityType());

            consultationDetails.add(responseBody);
        }

        return consultationDetails;
    }

    public DoctorDetailResponseBody getDoctorDetails(Long doctorId) {
        Optional<Professional> optionalProfessional = professionalRepository.findById(doctorId);
        if (optionalProfessional.isEmpty()) {
            throw new RuntimeException("Professional(doctor) not found with ID: " + doctorId);
        }

        Professional professional = optionalProfessional.get();
        User user = professional.getUser();
        if (user == null || !user.getType().equals("doctor")) {
            throw new RuntimeException("User with ID " + doctorId + " is not a doctor.");
        }

        return DoctorDetailResponseBody.builder()
                .id(professional.getId())
                .name(user.getFirstName() + " " + user.getLastName())
                .systemOfMedicine(professional.getSystemOfMedicine())
                .qualification(professional.getQualification())
                .place_of_work(professional.getPlaceOfWork())
                .build();
    }

    public DoctorDetailResponseBody getRadiologistDetails(Long radiologistId) {
        Optional<Professional> optionalProfessional = professionalRepository.findById(radiologistId);
        if (optionalProfessional.isEmpty()) {
            throw new RuntimeException("Professional(radiologist) not found with ID: " + radiologistId);
        }

        Professional professional = optionalProfessional.get();
        User user = professional.getUser();
        if (user == null || !user.getType().equals("radiologist")) {
            throw new RuntimeException("User with ID " + radiologistId + " is not a doctor.");
        }

        return DoctorDetailResponseBody.builder()
                .id(professional.getId())
                .name(user.getFirstName() + " " + user.getLastName())
                .systemOfMedicine(professional.getSystemOfMedicine())
                .qualification(professional.getQualification())
                .place_of_work(professional.getPlaceOfWork())
                .build();
    }





}
