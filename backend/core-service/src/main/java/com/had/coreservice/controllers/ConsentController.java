package com.had.coreservice.controllers;
import com.had.coreservice.entity.Consent;
import com.had.coreservice.entity.ConsentStatus;
import com.had.coreservice.entity.Token;
import com.had.coreservice.responseBody.ConsentDetailResponseBody;
import com.had.coreservice.service.ConsentService;
import com.had.coreservice.service.MailingService;
import com.had.coreservice.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/core/consent")
public class ConsentController {

    @Autowired
    ConsentService consentService;

    @Autowired
    MailingService mailingService;

    @Autowired
    TokenService tokenService;

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

    @GetMapping("/radiologist-add/status")
    public ResponseEntity<?> getRadiologistAdditionConsentStatus(@RequestParam Long consultationId, @RequestParam Long radEntityId ) {
        try {
            ConsentStatus consentStatus = consentService.getConsentStatusByConsultationIdAndRadId(consultationId, radEntityId);
            if (consentStatus != null) {
                return ResponseEntity.ok(consentStatus);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving consent status: " + e.getMessage());
        }
    }

//    @GetMapping("/radiologist-add-all/status")
//    public ResponseEntity<?> getAllRadiologistAdditionConsentStatus(@RequestParam Long consultationId) {
//        try {
//            ConsentStatus consentStatus = consentService.getAllConsentStatusByConsultationId(consultationId);
//            if (consentStatus != null) {
//                return ResponseEntity.ok(consentStatus);
//            } else {
//                return ResponseEntity.notFound().build();
//            }
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving consent status: " + e.getMessage());
//        }
//    }


    @GetMapping("/lab-add/status")
    public ResponseEntity<?> getLabAdditionConsentStatus(@RequestParam Long consultationId, @RequestParam Long labEntityId ) {
        try {
            ConsentStatus consentStatus = consentService.getConsentStatusByConsultationIdAndLabId(consultationId, labEntityId);
            if (consentStatus != null) {
                return ResponseEntity.ok(consentStatus);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving consent status: " + e.getMessage());
        }
    }


    @GetMapping("/doc-add/status")
    public ResponseEntity<?> getDoctorAdditionConsentStatus(@RequestParam Long consultationId, @RequestParam Long docEntityId ) {
        try {
            ConsentStatus consentStatus = consentService.getConsentStatusByConsultationIdAndDocId(consultationId, docEntityId);
            if (consentStatus != null) {
                return ResponseEntity.ok(consentStatus);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving consent status: " + e.getMessage());
        }
    }


    @GetMapping("/details/{consentId}")
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

    @GetMapping("/all/{consultationId}")
    public ResponseEntity<List<ConsentDetailResponseBody>> getConsentsByConsultationId(@PathVariable Long consultationId) {
        try {
            List<ConsentDetailResponseBody> consentDetailResponseBodies = consentService.getConsentsByConsultationId(consultationId);
            return ResponseEntity.ok(consentDetailResponseBodies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

//    @GetMapping("/validate-token/{consentId}/")
//    public ResponseEntity<String> getTokenForConsent(@PathVariable Long consentId) {
//        try {
//            List<ConsentDetailResponseBody> consentDetailResponseBodies = consentService.getTokenForConsentId(consultationId);
//            return ResponseEntity.ok(consentDetailResponseBodies);
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
//                    .body(null);
//        }
//    }


    @GetMapping("/validate-token/{consentId}")
    public ResponseEntity<String> validateTokenByConsentId(@PathVariable Long consentId, @RequestParam String token) {
        try {
            return tokenService.validateTokenByConsentId(consentId, token);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred.");
        }
    }

}
