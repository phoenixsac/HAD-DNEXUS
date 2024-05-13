package com.had.coreservice.service;

import ch.qos.logback.core.joran.spi.ElementSelector;
import com.had.coreservice.constants.Constants;
import com.had.coreservice.entity.Consent;
import com.had.coreservice.entity.ConsentStatus;
import com.had.coreservice.entity.Consultation;
import com.had.coreservice.repository.*;
import com.had.coreservice.responseBody.ConsentDetailResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
public class ConsentService {

    @Autowired
    private final ConsentRepository consentRepository;

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    FacilityRepository facilityRepository;

    @Autowired
    MailingService mailingService;

    @Autowired
    private final ConsultationRepository consultationRepository;

    @Autowired
    private final ProfessionalRepository professionalRepository;

    public ConsentService(ConsentRepository consentRepository, ConsultationRepository consultationRepository, ProfessionalRepository professionalRepository) {
        this.consentRepository = consentRepository;
        this.consultationRepository = consultationRepository;
        this.professionalRepository = professionalRepository;
    }


    public Consent createConsent(Long consultationId, Long patientId, Long entityId, String entityType, String consentType) {
        Consultation consultation = consultationRepository.findById(consultationId).orElseThrow(() -> new IllegalArgumentException("Consultation not found with ID: " + consultationId));

        String entityName = null;

        if("DOCTOR".equalsIgnoreCase(entityType)) {
            Optional<String> doctorNameOptional = professionalRepository.findFullNameByProfessionalIdAndUserType(entityId, entityType);
            entityName = doctorNameOptional.orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + entityId));
        }
        else if("LAB".equalsIgnoreCase(entityType)) {
            Optional<String> entityNameOptional = facilityRepository.findFacNameById(entityId, entityType);
            entityName = entityNameOptional.orElseThrow(() -> new IllegalArgumentException("Lab not found with ID: " + entityId));
        }
        else if ("RADIOLOGIST".equalsIgnoreCase(entityType)) {
            Optional<String> entityNameOptional = professionalRepository.findFullNameByProfessionalIdAndUserType(entityId, entityType);
            entityName = entityNameOptional.orElseThrow(() -> new IllegalArgumentException("Radiologist not found with ID: " + entityId));
        }
        else{
            throw new IllegalArgumentException("Entity type must be DOCTOR or LAB or RADIOLOGIST to create consent");
        }


        Optional<String> patNameOptional = patientRepository.findNameById(patientId);
        String patientName = patNameOptional.orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + patientId));

        Optional<String> docNameOptional = professionalRepository.findFullNameByProfessionalIdAndUserType(consultation.getDocProfesionalId(), "DOCTOR");
        String docName = docNameOptional.orElseThrow(() -> new IllegalArgumentException("Doc not found with in this consultation: " + consultation.getDocProfesionalId()));

        Consent consent = new Consent();
        consent.setConsultationId(consultationId);
        consent.setPatientId(patientId);
        consent.setEntityId(entityId);
        consent.setEntityType(entityType);
        consent.setConsentType(consentType);

        String consentMessage = "";
        if(Constants.ENTITY_TYPE_DOCTOR.equalsIgnoreCase(entityType))
            consentMessage = String.format(Constants.DOCTOR_CASE_CONSENT_TEMPLATE, entityName, entityName);
        else if(Constants.ENTITY_TYPE_LAB.equalsIgnoreCase(entityType))
            consentMessage = String.format(Constants.LAB_CASE_CONSENT_TEMPLATE, docName, entityName, entityName);
        else if(Constants.ENTITY_TYPE_RADIOLOGIST.equalsIgnoreCase(entityType))
            consentMessage = String.format(Constants.RADIOLOGIST_CASE_CONSENT_TEMPLATE, docName, entityName, entityName);

        consent.setConsentMessage(consentMessage);
        consent.setConsentStatus(ConsentStatus.NONE);
        consent.setConsentDate(LocalDateTime.now());
        consent.setCreatedAt(LocalDateTime.now());
        consent.setConsentExpiry(consent.getCreatedAt().plusHours(1));

        Consent savedConsent = consentRepository.save(consent);
        if (savedConsent != null) {
            mailingService.sendConsentEmail(savedConsent, patientName, entityName, patientId);
        }
        return consent;
    }

    @Transactional
    public Consent updateConsentStatus(Long consentId, ConsentStatus newStatus) {
        Consent consent = consentRepository.findById(consentId)
                .orElseThrow(() -> new IllegalArgumentException("Consent not found with ID: " + consentId));
        consent.setConsentStatus(newStatus);
        return consentRepository.save(consent);
    }

    public ConsentStatus getConsentStatusById(Long consentId) {
        Consent consent = consentRepository.findById(consentId).orElse(null);
        return consent != null ? consent.getConsentStatus() : null;
    }

    public ConsentDetailResponseBody getConsentDetailById(Long consentId) {
        Optional<Consent> optionalConsent = consentRepository.findById(consentId);
        if (optionalConsent.isPresent()) {
            Consent consent = optionalConsent.get();
            return mapToConsentDetailResponseBody(consent);
        } else {
            return null;
        }
    }

    private ConsentDetailResponseBody mapToConsentDetailResponseBody(Consent consent) {

        Optional<String> patNameOptional = patientRepository.findNameById(consent.getPatientId());
        String patientName = patNameOptional.orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + consent.getPatientId()));

        String entityName = null;
        if(consent.getEntityType().equalsIgnoreCase("DOCTOR")){
            Optional<String> doctorNameOptional = professionalRepository.findFullNameByProfessionalIdAndUserType(consent.getEntityId(), "DOCTOR");
            entityName = doctorNameOptional.orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + consent.getEntityId()));
        }

        ConsentDetailResponseBody consentDetailResponseBody = new ConsentDetailResponseBody();
        consentDetailResponseBody.setId(consent.getId());
        consentDetailResponseBody.setPatientName(patientName);
        consentDetailResponseBody.setEntityId(consent.getEntityId());
        consentDetailResponseBody.setEntityName(entityName);
        consentDetailResponseBody.setConsultationId(consent.getConsultationId());
        consentDetailResponseBody.setConsentMessage(consent.getConsentMessage());
        consentDetailResponseBody.setConsentStatus(consent.getConsentStatus());
        consentDetailResponseBody.setEntityType(consent.getEntityType());
        consentDetailResponseBody.setConsentDate(consent.getConsentDate());

        return consentDetailResponseBody;

    }

    public List<ConsentDetailResponseBody> getConsentsByPatientId(Long patientId) {
        Optional<List<Consent>> consentsOptional = consentRepository.findListOfConsentsByPatientId(patientId);

        if (consentsOptional.isPresent()) {
            List<Consent> consents = consentsOptional.get();
            return consents.stream()
                    .map(this::mapToConsentDetailResponseBody)
                    .collect(Collectors.toList());
        } else {
            return Collections.emptyList();
        }
    }

    public List<ConsentDetailResponseBody> getConsentsByConsultationId(Long consultationId) {
        List<Consent> consents = consentRepository.findByConsultationId(consultationId);
        return consents.stream()
                .map(this::mapToConsentDetailResponseBody)
                .collect(Collectors.toList());
    }


    public ConsentStatus getConsentStatusByConsultationIdAndRadId(Long consultationId, Long radEntityId) {
        try {
            // Convert entity type to uppercase for case-insensitive comparison
            String entityType = "RADIOLOGIST";

            Consent consent = consentRepository.findByConsultationIdAndEntityIdAndEntityTypeIgnoreCase(consultationId, radEntityId, entityType);

            if (consent != null) {
                // Check if the consent has expired
                if (consent.getConsentExpiry() != null && consent.getConsentExpiry().isBefore(LocalDateTime.now())) {
                    return ConsentStatus.EXPIRED;
                } else {
                    return consent.getConsentStatus();
                }
            } else {
                return null;
            }
        } catch (IllegalArgumentException e) {
            // If invalid arguments are provided, return BAD_REQUEST (400)
            throw new IllegalArgumentException("Invalid arguments provided: " + e.getMessage());
        } catch (Exception e) {

            throw new RuntimeException("Error retrieving consent status: " + e.getMessage());
        }
    }

    public ConsentStatus getConsentStatusByConsultationIdAndDocId(Long consultationId, Long docEntityId) {
        try {
            // Convert entity type to uppercase for case-insensitive comparison
            String entityType = "DOCTOR";

            Consent consent = consentRepository.findByConsultationIdAndEntityIdAndEntityTypeIgnoreCase(consultationId, docEntityId, entityType);

            if (consent != null) {
                // Check if the consent has expired
                if (consent.getConsentExpiry() != null && consent.getConsentExpiry().isBefore(LocalDateTime.now())) {
                    return ConsentStatus.EXPIRED;
                } else {
                    return consent.getConsentStatus();
                }
            } else {
                return null;
            }
        } catch (IllegalArgumentException e) {
            // If invalid arguments are provided, return BAD_REQUEST (400)
            throw new IllegalArgumentException("Invalid arguments provided: " + e.getMessage());
        } catch (Exception e) {

            throw new RuntimeException("Error retrieving consent status: " + e.getMessage());
        }
    }


    public ConsentStatus getConsentStatusByConsultationIdAndLabId(Long consultationId, Long labEntityId) {
        try {
            // Convert entity type to uppercase for case-insensitive comparison
            String entityType = "LAB";

            Consent consent = consentRepository.findByConsultationIdAndEntityIdAndEntityTypeIgnoreCase(consultationId, labEntityId, entityType);

            if (consent != null) {
                // Check if the consent has expired
                if (consent.getConsentExpiry() != null && consent.getConsentExpiry().isBefore(LocalDateTime.now())) {
                    return ConsentStatus.EXPIRED;
                } else {
                    return consent.getConsentStatus();
                }
            } else {
                return null;
            }
        } catch (IllegalArgumentException e) {
            // If invalid arguments are provided, return BAD_REQUEST (400)
            throw new IllegalArgumentException("Invalid arguments provided: " + e.getMessage());
        } catch (Exception e) {

            throw new RuntimeException("Error retrieving consent status: " + e.getMessage());
        }
    }

}
