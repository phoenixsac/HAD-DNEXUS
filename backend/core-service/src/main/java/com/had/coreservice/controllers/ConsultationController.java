package com.had.coreservice.controllers;

import com.had.coreservice.exception.ConsultationAlreadyClosedException;
import com.had.coreservice.exception.ConsultationNotFoundException;
import com.had.coreservice.requestBody.CreateConsultationRequestBody;
import com.had.coreservice.requestBody.FinalReportRequestBody;
import com.had.coreservice.responseBody.PatientResponseBodyForConsultation;
import com.had.coreservice.service.ConsultationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/core/consultation")
public class ConsultationController {

    @Autowired
    ConsultationService consultationService;

    @PostMapping("/create")
    public ResponseEntity<String> createConsultation(@RequestBody CreateConsultationRequestBody requestBody) {
        return consultationService.createConsultation(requestBody);
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

}
