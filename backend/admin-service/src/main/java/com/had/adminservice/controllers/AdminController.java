package com.had.adminservice.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.had.adminservice.exception.ResourceNotFoundException;
import com.had.adminservice.responseBody.FacilityResponseBody;
import com.had.adminservice.responseBody.PatientCardDetailResponseBody;
import com.had.adminservice.responseBody.PatientResponseBody;
import com.had.adminservice.responseBody.ProfessionalResponseBody;
import com.had.adminservice.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    AdminService adminService;

    @PostMapping("/add-facility")
    public ResponseEntity<String> addFacilityByFacilityId(@RequestParam("facilityId") String facilityId) {

        try {
            String message = adminService.addFacility(facilityId);
            if (message.equals("Facility with the provided facility id already exists!")) {
                return ResponseEntity.badRequest().body(message);
            } else {

                return ResponseEntity.ok(message);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing data: " + e.getMessage());
        }
    }

    @GetMapping("/all-facilities")
    public ResponseEntity<List<FacilityResponseBody>> getAllFacilities() {
        try {
            List<FacilityResponseBody> responseBodies = adminService.getAllFacilities();
            return ResponseEntity.ok(responseBodies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all-facilities-by-type")
    public ResponseEntity<List<FacilityResponseBody>> getAllFacilitiesByType(@RequestParam String type) {
        try {
            List<FacilityResponseBody> responseBodies = adminService.getAllFacilitiesByType(type);
            return ResponseEntity.ok(responseBodies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/facility-by-id")
    public ResponseEntity<String> getAllFacilityById(@RequestParam Long id) {
        try {
            FacilityResponseBody responseBody = adminService.getFacilityById(id);
            // Convert the FacilityResponseBody to JSON string
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonString = objectMapper.writeValueAsString(responseBody);
            return ResponseEntity.ok(jsonString);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    @DeleteMapping("/remove-facility")
    public ResponseEntity<String> removeFacility(@RequestParam String facilityId) {
        try {
            adminService.removeFacility(facilityId);
            return ResponseEntity.ok("Facility with ID " + facilityId + " deleted successfully.");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Facility not found: " + e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete facility: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing data: " + e.getMessage());
        }
    }

    //-----------------------------------------------PROFESSIONAL----------------------------------------------------

    @PostMapping("/add-professional")
    public ResponseEntity<String> addProfessionalByFacilityId(@RequestParam("hpId") Long hpId) {

        try {
            String message = adminService.addProfessional(hpId);
            if (message.equals("Professional with the provided facility id already exists!")) {
                return ResponseEntity.badRequest().body(message);
            }
            else if(message.equals("Professional associated facility id does not exist in Facility and HFR tables.")){
                return ResponseEntity.badRequest().body(message);
            }else {
                return ResponseEntity.ok(message);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing data: " + e.getMessage());
        }
    }

    @DeleteMapping("/remove-professional")
    public ResponseEntity<String> removeProfessional(@RequestParam Long id) {
        try {
            adminService.removeProfessional(id);
            return ResponseEntity.ok("Professional with ID " + id + " deleted successfully.");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Professional not found: " + e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete professional: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing data: " + e.getMessage());
        }
    }

    @GetMapping("/all-professionals")
    public ResponseEntity<List<ProfessionalResponseBody>> getAllProfessionals() {
        try {
            List<ProfessionalResponseBody> responseBodies = adminService.getAllProfessionals();
            return ResponseEntity.ok(responseBodies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/all-professionals-by-type")
    public ResponseEntity<List<ProfessionalResponseBody>> getProfessionalsByType(@RequestParam String type) {
        try {
            List<ProfessionalResponseBody> responseBodies = adminService.getAllProfessionalsByType(type);
            return ResponseEntity.ok(responseBodies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/professional-by-id")
    public ResponseEntity<String> getProfessionalById(@RequestParam Long id) {
        try {
            ProfessionalResponseBody responseBody = adminService.getProfessionalById(id);
            // Convert the FacilityResponseBody to JSON string
            ObjectMapper objectMapper = new ObjectMapper();
            String jsonString = objectMapper.writeValueAsString(responseBody);
            return ResponseEntity.ok(jsonString);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Internal server error");
        }
    }

    //-----------------------------------------------PATIENT----------------------------------------------------

    @GetMapping("/all-patients")
    public ResponseEntity<?> getAllPatientDetails() {
        try {
            List<PatientCardDetailResponseBody> patientDetails = adminService.getAllPatientDetails();
            return ResponseEntity.ok(patientDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/details-by-id")
    public ResponseEntity<?> getPatientDetailsById(@RequestParam Long patientId) {
        try {
            PatientResponseBody patientDetails = adminService.getPatientDetailsById(patientId);
            return ResponseEntity.ok(patientDetails);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
