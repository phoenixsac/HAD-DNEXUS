package com.had.coreservice.controllers;

import com.had.coreservice.constants.Constants;
import com.had.coreservice.exception.ConsultationAlreadyClosedException;
import com.had.coreservice.exception.ConsultationNotFoundException;
import com.had.coreservice.requestBody.CreateConsultationRequestBody;
import com.had.coreservice.requestBody.FinalReportRequestBody;
import com.had.coreservice.responseBody.DoctorDetailResponseBody;
import com.had.coreservice.responseBody.PatientResponseBodyForConsultation;
import com.had.coreservice.responseBody.ProfessionalRadiologistResponseBody;
import com.had.coreservice.service.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/core/consultation")
public class ConsultationController {

    @Autowired
    ConsultationService consultationService;

    @Autowired
    ConsentController consentController;





    private static final String CONSENT_CREATION_ENDPOINT = "http://your-consent-service-url/consents/create";


//    @PostMapping("/create")
//    public ResponseEntity<String> createConsultation(@RequestBody CreateConsultationRequestBody requestBody) {
//        return consultationService.createConsultation(requestBody);
//    }


    @PostMapping("/create")
    public ResponseEntity<String> createConsultation(@RequestBody CreateConsultationRequestBody requestBody) {
        ResponseEntity<String> consultationResponse = consultationService.createConsultation(requestBody);

        if (consultationResponse.getStatusCode() != HttpStatus.CREATED) {
            return consultationResponse;
        }

        String responseBody = consultationResponse.getBody();
        Long consultationId = extractConsultationIdFromResponse(responseBody);

        if (consultationId == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to extract consultation ID");
        }

        Long patientId = requestBody.getPatientId();
        Long entityId = requestBody.getProfessionalDocId();
        String consentType = Constants.DOCTOR_CASE_CONSENT;
        String entityType = Constants.ENTITY_TYPE_DOCTOR;

        ResponseEntity<?> consentResponse = consentController.createConsent(patientId, entityId, entityType, consultationId, consentType);

        if (consentResponse.getStatusCode() == HttpStatus.OK) {
            return new ResponseEntity<>("Consultation created successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Failed to create consent", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//    private Long extractConsultationId(String responseBody) {
//        // Assuming responseBody contains only the consultation ID
//        try {
//            return Long.parseLong(responseBody);
//        } catch (NumberFormatException e) {
//            return null;
//        }
//    }

    private Long extractConsultationIdFromResponse(String responseBody) {
        // Extract consultation ID from the response body
        // Example: "Consultation created successfully with ID: 123"
        String idPrefix = "Consultation created successfully with ID: ";
        int idIndex = responseBody.indexOf(idPrefix);
        if (idIndex != -1) {
            String idString = responseBody.substring(idIndex + idPrefix.length());
            try {
                return Long.parseLong(idString);
            } catch (NumberFormatException e) {
                return null; // Unable to parse consultation ID
            }
        } else {
            return null; // ID prefix not found in response body
        }
    }

    @PostMapping("/add-final-report")
    public ResponseEntity<?> addFinalReportToConsultation(
            @RequestParam Long professionalDocId,
            @RequestParam Long consultancyId,
            @RequestBody FinalReportRequestBody requestBody) {
        try {
            String finalReport = requestBody.getFinalReport();
            finalReport = finalReport.replace("\n", "");
            consultationService.addFinalReportToConsultation(professionalDocId, consultancyId, finalReport);
            return ResponseEntity.ok("Final report added successfully");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred: " + ex.getMessage());
        }
    }

    @GetMapping("/get-test")
    public ResponseEntity<String> getTestByConsultationId(@RequestParam Long consultationId) {
        try {
            String test = consultationService.getTestByConsultationId(consultationId);
            return ResponseEntity.ok(test);
        } catch (ConsultationNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @GetMapping("/get-final-report")
    public ResponseEntity<String> getFinalReportByConsultationId(@RequestParam Long consultationId) {
        try {
            String test = consultationService.getFinalReportByConsultationId(consultationId);
            return ResponseEntity.ok(test);
        } catch (ConsultationNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping("/post-final-report")
    public ResponseEntity<?> postFinalReport(
            @RequestParam Long consultationId,
            @RequestBody String finalReport
    ) {
        try {
            consultationService.saveFinalReport(consultationId, finalReport);
            return ResponseEntity.ok("Final report saved successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/close-consultation")
    public ResponseEntity<String> closeConsultation(@RequestParam Long consultationId) {
        try {
            consultationService.closeConsultation(consultationId);
            return ResponseEntity.ok("Consultation closed successfully");
        } catch (ConsultationNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (ConsultationAlreadyClosedException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while closing the consultation.");
        }
    }

    //get consultation status
    @GetMapping("/status")
    public ResponseEntity<String> getConsultationStatus(@RequestParam Long consultationId) {
        try {
            String status = consultationService.getConsultationStatus(consultationId);
            return ResponseEntity.ok(status);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    //get patient details for consultation
    @GetMapping("/patient-details")
    public ResponseEntity<?> getPatientDetailsForConsultation(@RequestParam Long consultationId) {
        try {
            PatientResponseBodyForConsultation patientDetails = consultationService.getPatientDetailsForConsultation(consultationId);
            return ResponseEntity.ok(patientDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/patient-details-by-patient-id")
    public ResponseEntity<?> getPatientDetailsByPatientId(@RequestParam Long patientId) {
        try {
            PatientResponseBodyForConsultation patientDetails = consultationService.getPatientDetailsByPatientId(patientId);
            return ResponseEntity.ok(patientDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/radiologist-detail-for-consultation")
    public ResponseEntity<?> getPatientDetailsByConsultationId(@RequestParam Long consultationId) {
        try {
            ProfessionalRadiologistResponseBody professionalResponse = consultationService.getProfessionalDetailsByConsultationId(consultationId);
            return ResponseEntity.ok(professionalResponse);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/doctor-details-by-consultation")
    public ResponseEntity<DoctorDetailResponseBody> getDoctorDetails(@RequestParam Long consultationId) {
        try {
            DoctorDetailResponseBody doctorDetails = consultationService.getDoctorDetailsByConsultationId(consultationId);
            return ResponseEntity.ok(doctorDetails);
        } catch (Exception e) {
            // Handle exception appropriately
            return ResponseEntity.status(500).body(null); // Example: Internal Server Error
        }
    }
}
