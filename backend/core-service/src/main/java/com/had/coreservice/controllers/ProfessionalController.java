package com.had.coreservice.controllers;

import com.had.coreservice.responseBody.ConsultationCardDetailResponseBody;
import com.had.coreservice.responseBody.DoctorDetailResponseBody;
import com.had.coreservice.responseBody.PatientCardDetailResponseBody;
import com.had.coreservice.responseBody.ProfessionalRadiologistResponseBody;
import com.had.coreservice.service.ProfessionalService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/core/professional")
public class ProfessionalController {

    private final ProfessionalService professionalService;

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
            return ResponseEntity.ok("Radiologist added to the consultation successfully");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + ex.getMessage());
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
}
