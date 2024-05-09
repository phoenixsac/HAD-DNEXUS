package com.had.coreservice.service;

import com.had.coreservice.constants.Constants;
import com.had.coreservice.entity.Consent;
import com.had.coreservice.entity.ConsentStatus;
import com.had.coreservice.entity.Consultation;
import com.had.coreservice.repository.ConsentRepository;
import com.had.coreservice.repository.ConsultationRepository;
import com.had.coreservice.repository.PatientRepository;
import com.had.coreservice.repository.ProfessionalRepository;
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

        if (!"DOCTOR".equalsIgnoreCase(entityType)) {
            throw new IllegalArgumentException("Entity type must be DOCTOR to create consent");
        }

//        Optional<Object[]> doctorNameOptional = professionalRepository.findNameById(entityId);
//        String doctorName = doctorNameOptional.map(nameArray -> nameArray[0] + " " + nameArray[1])
//                .orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + entityId));
//
//        Optional<Object[]> patNameOptional = patientRepository.findNameById(patientId);
//        String patientName = patNameOptional.map(nameArray -> nameArray[0] + " " + nameArray[1])
//                .orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + patientId));

        Optional<String> doctorNameOptional = professionalRepository.findNameById(entityId);
        String doctorName = doctorNameOptional.orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + entityId));


        Optional<String> patNameOptional = patientRepository.findNameById(patientId);
        String patientName = patNameOptional.orElseThrow(() -> new IllegalArgumentException("Patient not found with ID: " + patientId));



        Consent consent = new Consent();
        consent.setConsultationId(consultationId);
        consent.setPatientId(patientId);
        consent.setEntityId(entityId);
        consent.setEntityType(entityType);
        consent.setConsentType(consentType);
        consent.setConsentMessage(Constants.DOCTOR_CASE_CONSENT_TEMPLATE);
        consent.setConsentStatus(ConsentStatus.NONE);
        consent.setConsentDate(LocalDateTime.now());
        consent.setCreatedAt(LocalDateTime.now());

        Consent savedConsent = consentRepository.save(consent);
        if (savedConsent != null) {
            mailingService.sendConsentEmail(savedConsent, patientName, doctorName, patientId);
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
            Optional<String> doctorNameOptional = professionalRepository.findNameById(consent.getEntityId());
            entityName = doctorNameOptional.orElseThrow(() -> new IllegalArgumentException("Doctor not found with ID: " + consent.getEntityId()));
        }

        ConsentDetailResponseBody consentDetailResponseBody = new ConsentDetailResponseBody();
        consentDetailResponseBody.setId(consent.getId());
        consentDetailResponseBody.setPatientName(patientName);
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

}
