package com.had.adminservice.controllers;

import com.had.adminservice.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminController {

    @Autowired
    AdminService adminService;

    //ufid : UNIQUE FACILITY ID
    @PostMapping("/admin/add-hospital")
    public ResponseEntity<String> addHospitalFromUfid(@RequestParam String ufid) {
        try{
            String message = adminService.addHospital(ufid);
            if (message.equals("Hospital with the provided UFID already exists!")) {
            return ResponseEntity.badRequest().body(message);
            } else{
                return ResponseEntity.ok(message);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing data: " + e.getMessage());
        }
    }

    //upid : UNIQUE PROFESSIONALS ID
    @PostMapping("/admin/add-doctor")
    public ResponseEntity<String> addDoctorFromUfid(@RequestParam String upid) {
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

    @DeleteMapping("/admin/remove-doctor")
    public ResponseEntity<String> removeDoctorFromUfid(@RequestParam String upid) {
        try {
            adminService.removeDoctor(upid);
            return ResponseEntity.ok("Doctor with "+upid+" deleted!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing data: " + e.getMessage());
        }
    }

    @DeleteMapping("/admin/remove-hospital")
    public ResponseEntity<String> removeHospitalFromUfid(@RequestParam String ufid) {
        try {
            adminService.removeHospital(ufid);
            return ResponseEntity.ok("Hospital with "+ufid+" deleted!.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing data: " + e.getMessage());
        }
    }





//add-hospital
///add-doctor
///remove-hospital
///remove-doctor
///remove-patient-all-details


}
