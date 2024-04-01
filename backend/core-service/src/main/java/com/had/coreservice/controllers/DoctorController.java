package com.had.coreservice.controllers;

import com.had.coreservice.entity.Doctor;
import com.had.coreservice.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @GetMapping("/get-doctor-profile")
    public ResponseEntity<?> getDoctorProfileByEmail(@RequestParam String email) {
        if (email == null || email.isEmpty()) {
            return ResponseEntity.badRequest().body("Email parameter is required");
        }

        Doctor doctor = doctorService.findByEmail(email);
        if (doctor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor not found");
        }
        return ResponseEntity.ok(doctor);
    }
}

