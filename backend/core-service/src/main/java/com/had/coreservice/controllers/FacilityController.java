package com.had.coreservice.controllers;

import com.had.coreservice.constants.Constants;
import com.had.coreservice.repository.ConsultationRepository;
import com.had.coreservice.responseBody.ConsultationCardDetailResponseBody;
import com.had.coreservice.responseBody.LabDetailsResponseBody;
import com.had.coreservice.responseBody.LabFacilityDropdownResponseBody;
import com.had.coreservice.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/core/facility")
public class FacilityController {

    @Autowired
    FacilityService facilityService;

    @Autowired
    ConsentController consentController;

    @Autowired
    ConsultationRepository consultationRepository;

    @GetMapping("/get-labs")
    public ResponseEntity<List<LabFacilityDropdownResponseBody>> getLabFacilities() {
        try {
            List<LabFacilityDropdownResponseBody> labFacilities = facilityService.getLabFacilities();
            return ResponseEntity.ok(labFacilities);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/add-lab")
    public ResponseEntity<String> addLabToConsultation(@RequestParam Long consultationId, @RequestParam Long labFacId) {
        try {
            facilityService.addLabToConsultation(consultationId, labFacId);


            if (consultationId == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to extract consultation ID");
            }
            
            Long patientId = null;
            Optional<Long> patientIdOpt = consultationRepository.findPatientIdByConsultationId(consultationId);
            if(patientIdOpt.isPresent())
                patientId=patientIdOpt.get();

            String consentType = Constants.LAB_ADD_CONSENT;
            String entityType = Constants.ENTITY_TYPE_LAB;

            ResponseEntity<?> consentResponse = consentController.createConsent(patientId, labFacId, entityType, consultationId, consentType);

            if (consentResponse.getStatusCode() == HttpStatus.OK) {
                return new ResponseEntity<>("Lab added to consultation successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to create consent for lab addition", HttpStatus.INTERNAL_SERVER_ERROR);
            }

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request");
        }
    }

    //get lab associated consultation card details
    @GetMapping("/consultation-list")
    public ResponseEntity<?> getConsultationsByFacilityId(@RequestParam Long facLabId) {
        try {
            List<ConsultationCardDetailResponseBody> consultations = facilityService.getConsultationsByFacilityId(facLabId);
            if (consultations.isEmpty()) {
                return ResponseEntity.noContent().build(); // HTTP 204 No Content
            } else {
                return ResponseEntity.ok(consultations); // HTTP 200 OK
            }
        } catch (RuntimeException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Facility with ID " + facLabId + " not found.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse); // HTTP 404 Not Found with custom error message
        }
    }

    //get lab details for given consultation
    @GetMapping("/lab-details")
    public ResponseEntity<LabDetailsResponseBody> getLabDetailsForConsultation(@RequestParam Long consultationId) {
        try {
            LabDetailsResponseBody labDetails = facilityService.getLabDetailsForConsultation(consultationId);
            return ResponseEntity.ok(labDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

}
