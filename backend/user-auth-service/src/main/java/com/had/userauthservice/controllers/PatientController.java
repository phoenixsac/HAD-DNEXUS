package com.had.userauthservice.controllers;

import com.had.userauthservice.entities.Patient;
import com.had.userauthservice.requestBody.PatientSignupReqBody;
import com.had.userauthservice.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PatientController {

    @Autowired
    PatientService patientService;

    @PostMapping("/patient-signup")
    public ResponseEntity<String> patientSignup(@RequestBody PatientSignupReqBody request) {
        String registrationResult = patientService.registerPatient(request);
        if (registrationResult.equals("success")) {
            return new ResponseEntity<>(registrationResult, HttpStatus.CREATED);
        }
        else if (registrationResult.equals("User already exists.")) {
            return new ResponseEntity<>(registrationResult, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(registrationResult, HttpStatus.BAD_REQUEST);
        }
    }
}
