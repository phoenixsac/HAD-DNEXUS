package com.had.coreservice.controllers;

import com.had.coreservice.responseBody.LabFacilityDropdownResponseBody;
import com.had.coreservice.service.FacilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/core/facility")
public class FacilityController {

    @Autowired
    FacilityService facilityService;

    @GetMapping("/get-labs")
    public ResponseEntity<List<LabFacilityDropdownResponseBody>> getLabFacilities() {
        try {
            List<LabFacilityDropdownResponseBody> labFacilities = facilityService.getLabFacilities();
            return ResponseEntity.ok(labFacilities);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping("/add-lab")
    public ResponseEntity<String> addLabToConsultation(@RequestParam Long consultationId, @RequestParam Long labFacId) {
        try {
            facilityService.addLabToConsultation(consultationId, labFacId);
            return ResponseEntity.ok("Lab added to consultation successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request");
        }
    }



}
