package com.had.coreservice.controllers;

import com.had.coreservice.responseBody.ProfessionalRadiologistResponseBody;
import com.had.coreservice.service.ConsultationService;
import com.had.coreservice.service.ProfessionalService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
