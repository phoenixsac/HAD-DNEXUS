package com.had.coreservice.controllers;

import com.had.coreservice.constants.Constants;
import com.had.coreservice.repository.ConsultationRepository;
import com.had.coreservice.responseBody.ConsultationCardDetailResponseBody;
import com.had.coreservice.responseBody.DoctorDetailResponseBody;
import com.had.coreservice.responseBody.PatientCardDetailResponseBody;
import com.had.coreservice.responseBody.ProfessionalRadiologistResponseBody;
import com.had.coreservice.service.ProfessionalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/core/professional")
public class ProfessionalController {

    private final ProfessionalService professionalService;

    @Autowired
    ConsultationRepository consultationRepository;

    @Autowired
    ConsentController consentController;

    public ProfessionalController(ProfessionalService professionalService) {
        this.professionalService = professionalService;
    }

    @GetMapping("/get-radiologists")
    public ResponseEntity<?> getRadiologists() {
        try {
            List<ProfessionalRadiologistResponseBody> radiologists = professionalService.getRadiologists();
            return ResponseEntity.ok(radiologists);
        } catch (RuntimeException ex) {
            Map<String, String> errorResponse = Collections.singletonMap("error", ex.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @PostMapping("/add-radiologist")
    public ResponseEntity<?> addRadiologistToConsultation(@RequestParam Long consultationId, @RequestParam Long proRadiologistId) {
        try {
            professionalService.addRadiologistToConsultation(consultationId, proRadiologistId);

            if (consultationId == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to extract consultation ID");
            }

            Long patientId = null;
            Optional<Long> patientIdOpt = consultationRepository.findPatientIdByConsultationId(consultationId);
            if(patientIdOpt.isPresent())
                patientId=patientIdOpt.get();

            String consentType = Constants.RADIOLOGIST_ADD_CONSENT;
            String entityType = Constants.ENTITY_TYPE_RADIOLOGIST;

            ResponseEntity<?> consentResponse = consentController.createConsent(patientId, proRadiologistId, entityType, consultationId, consentType);

            if (consentResponse.getStatusCode() == HttpStatus.OK) {
                return new ResponseEntity<>("Radiologist added to consultation successfully", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to create consent for radiologist addition", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request");
        }
    }

    //get patient card detail list by doc id
    @GetMapping("/patient-card-detail-list")
    public List<PatientCardDetailResponseBody> getPatientCardDetailsByDoctor(
            @RequestParam Long docProffId) {
        return professionalService.getPatientCardDetailsByDoctor(docProffId);
    }

    //get consultation card details by doc id and patient id
    @GetMapping("/consultation-card-details")
    public List<ConsultationCardDetailResponseBody> getConsultationCardDetails(
            @RequestParam Long docId,
            @RequestParam Long patientId) {
        return professionalService.getConsultationCardDetails(docId, patientId);
    }

    //get radiologist associated consultation card details
    @GetMapping("/consultation-card-details-for-radiologist")
    public List<ConsultationCardDetailResponseBody> getConsultationCardDetailsByRadiologist(
            @RequestParam Long profRadiologistId) {
        return professionalService.getConsultationCardDetailsByRadiologist(profRadiologistId);
    }

    @GetMapping("/doctor-details-by-id")
    public List<ConsultationCardDetailResponseBody> getDoctorDetailsByProffDocId(
            @RequestParam Long profRadiologistId) {
        return professionalService.getConsultationCardDetailsByRadiologist(profRadiologistId);
    }

    @GetMapping("/doctor-details")
    public ResponseEntity<?> getDoctorDetails(@RequestParam Long doctorId) {
        try {
            DoctorDetailResponseBody doctorDetails = professionalService.getDoctorDetails(doctorId);
            return ResponseEntity.ok(doctorDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @GetMapping("/radiologist-details")
    public ResponseEntity<?> getDoctorDetailsById(@RequestParam Long radiologistId) {
        try {
            DoctorDetailResponseBody radiologistDetails = professionalService.getRadiologistDetails(radiologistId);
            return ResponseEntity.ok(radiologistDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
