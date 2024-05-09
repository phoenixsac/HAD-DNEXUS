package com.had.coreservice.controllers;
import com.had.coreservice.entity.Consent;
import com.had.coreservice.entity.ConsentStatus;
import com.had.coreservice.responseBody.ConsentDetailResponseBody;
import com.had.coreservice.service.ConsentService;
import com.had.coreservice.service.MailingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/core/consent")
public class ConsentController {

    @Autowired
    ConsentService consentService;

    @Autowired
    MailingService mailingService;

    @PostMapping("/create")
    public ResponseEntity<?> createConsent(@RequestParam Long patientId,
                                           @RequestParam Long entityId,
                                           @RequestParam String entityType,
                                           @RequestParam Long consultationId,
                                           @RequestParam String consentType) {
        try {
            Consent consent = consentService.createConsent(consultationId, patientId, entityId, entityType, consentType);
            return ResponseEntity.ok(consent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error creating consent: " + e.getMessage());
        }
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<?> getConsentsByPatientId(@PathVariable Long patientId) {
        try {
            // Assuming you have a method in ConsentService to retrieve consents by patient ID
            List<ConsentDetailResponseBody> consents = consentService.getConsentsByPatientId(patientId);
            return ResponseEntity.ok(consents);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving consents: " + e.getMessage());
        }
    }


    @PutMapping("/{consentId}/status")
    public ResponseEntity<?> updateConsentStatus(@PathVariable Long consentId, @RequestParam ConsentStatus newStatus) {
        try {
            if (!isValidConsentStatus(newStatus)) {
                throw new IllegalArgumentException("Invalid consent status value: " + newStatus);
            }

            Consent consent = consentService.updateConsentStatus(consentId, newStatus);
            return ResponseEntity.ok(consent);
        } catch (IllegalArgumentException e) {
            // Catch the IllegalArgumentException thrown for invalid consent status
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating consent status: " + e.getMessage());
        }
    }

    private boolean isValidConsentStatus(ConsentStatus status) {
        // Check if the status is one of the valid enum values
        return status == ConsentStatus.ACCEPT || status == ConsentStatus.REJECT || status == ConsentStatus.WITHDRAWN;
    }


    @GetMapping("/{consentId}/status")
    public ResponseEntity<?> getConsentStatus(@PathVariable Long consentId) {
        try {
            // Call ConsentService to retrieve the consent status
            ConsentStatus consentStatus = consentService.getConsentStatusById(consentId);
            if (consentStatus != null) {
                return ResponseEntity.ok(consentStatus);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving consent status: " + e.getMessage());
        }
    }

    @GetMapping("/{consentId}")
    public ResponseEntity<?> getConsentDetails(@PathVariable Long consentId) {
        try {
            // Call ConsentService to retrieve the consent details
            ConsentDetailResponseBody consentDetails = consentService.getConsentDetailById(consentId);
            if (consentDetails == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(consentDetails);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving consent details: " + e.getMessage());
        }
    }

    @GetMapping("/{consultationId}")
    public ResponseEntity<List<ConsentDetailResponseBody>> getConsentsByConsultationId(@PathVariable Long consultationId) {
        try {
            List<ConsentDetailResponseBody> consentDetailResponseBodies = consentService.getConsentsByConsultationId(consultationId);
            return ResponseEntity.ok(consentDetailResponseBodies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }


}
