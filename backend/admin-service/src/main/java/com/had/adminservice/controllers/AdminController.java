package com.had.adminservice.controllers;

import com.had.adminservice.entity.Doctor;
import com.had.adminservice.exception.DoctorNotFoundException;
import com.had.adminservice.repository.DoctorRepository;
import com.had.adminservice.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class AdminController {

    @Autowired
    AdminService adminService;

    @Autowired
    DoctorRepository doctorRepository;

    //ufid : UNIQUE FACILITY ID
    //for role based access role and tasks and action validation can be done here, or in the service class
    @PostMapping("/admin/add-hospital")
    public ResponseEntity<String> addHospitalFromUfid(@RequestParam String ufid) {
        try {
            String message = adminService.addHospital(ufid);
            if (message.equals("Hospital with the provided UFID already exists!")) {
                return ResponseEntity.badRequest().body(message);
            } else {
                return ResponseEntity.ok(message);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing data: " + e.getMessage());
        }
    }

    @DeleteMapping("/admin/remove-hospital")
    public ResponseEntity<String> removeHospitalFromUfid(@RequestParam String ufid) {
        try {
            adminService.removeHospital(ufid);
            return ResponseEntity.ok("Hospital with " + ufid + " deleted!.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing data: " + e.getMessage());
        }
    }

    //-----------------------------------------------DOCTOR----------------------------------------------------

    //upid : UNIQUE PROFESSIONALS ID
    @PostMapping("/admin/add-doctor")
    public ResponseEntity<String> addDoctorFromUpid(@RequestParam Long upid) {
        try {
            String message = adminService.addDoctor(upid);
            if (message.equals("Doctor with the provided UPID already exists!")) {
                return ResponseEntity.badRequest().body(message);
            } else {
                return ResponseEntity.ok(message);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing data: " + e.getMessage());
        }
    }

    @GetMapping("/admin/view-doctor-list")
    public ResponseEntity<?> viewDoctorList() {
        try {
            List<Doctor> doctors = adminService.getAllDoctors().getBody();
            if (doctors.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No doctors found");
            } else {
                return ResponseEntity.ok(doctors);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while fetching doctors");
        }
    }

    @GetMapping("/admin/view-doctor-details/{id}")
    public ResponseEntity<?> getDoctorById(@PathVariable Long id) {
        try {
            Doctor doctor = adminService.getDoctorById(id);
            return ResponseEntity.ok(doctor);
        } catch (DoctorNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while fetching doctor details");
        }
    }

    @DeleteMapping("/admin/remove-doctor/{id}")
    public ResponseEntity<String> removeDoctorFromUpid(@RequestParam Long id) {
        try {
            ResponseEntity<String> response = adminService.removeDoctor(id);
            if (response.getStatusCode() == HttpStatus.NO_CONTENT) {
                // Doctor successfully deleted
                return ResponseEntity.ok("Doctor with ID " + id + " deleted!");
            } else if (response.getStatusCode() == HttpStatus.NOT_FOUND) {
                // Doctor with the given ID doesn't exist
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Doctor with ID " + id + " does not exist.");
            } else {
                // Other errors
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing data.");
            }
        } catch (Exception e) {
            // Handle unexpected exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing data: " + e.getMessage());
        }
    }

    //RADIOLOGIST

    //LABORATORY



}
