package com.had.patientservice.controller;

import com.had.patientservice.requestBody.UpdatePatientReqBody;
import com.had.patientservice.requestBody.UpdatePatientRespBody;
import com.had.patientservice.responseBody.PatientDetailsRespBody;
import com.had.patientservice.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class PatientController {
    @Autowired
    PatientService patientService;


    @GetMapping("/patient/get-profile/{email}")
    public ResponseEntity<Object> getPatientDetails(@PathVariable String email) {
        Object result = patientService.getDetailsFromMailId(email);

        if (result instanceof String) {
            // Handle error case
            String errorMessage = (String) result;
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
        } else if (result instanceof PatientDetailsRespBody) {
            // Handle success case
            PatientDetailsRespBody responseBody = (PatientDetailsRespBody) result;
            return ResponseEntity.ok(responseBody);
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred");
    }

    @PutMapping("/patient/update")
    public ResponseEntity<Object> updatePatientDetails(@RequestBody UpdatePatientReqBody patientEditRequest) {
        try {
            // Delegate processing to the service class
            UpdatePatientRespBody updatedPatientDetails = patientService.updatePatientDetails(patientEditRequest);

            // If no exception occurred, return the updated patient details
            return ResponseEntity.ok(updatedPatientDetails);
        } catch (Exception e) {
            // Handle any exceptions and return appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update patient details: " + e.getMessage());
        }
    }


    //edit-profile
}
