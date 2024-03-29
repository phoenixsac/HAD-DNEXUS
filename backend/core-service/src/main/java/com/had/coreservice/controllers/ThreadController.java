package com.had.coreservice.controllers;

import com.had.coreservice.entity.ChatThread;
import com.had.coreservice.requestBody.CreateThreadRequest;
import com.had.coreservice.service.ThreadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class ThreadController {

    @Autowired
    private ThreadService threadService;

    @PostMapping("/thread/create")
    public ResponseEntity<String> createThread(@RequestBody CreateThreadRequest request) {
        // Validate request parameters
        if (request.getName() == null || request.getName().isEmpty() ||
                request.getPrescription() == null || request.getPrescription().isEmpty() ||
                request.getDocEmail() == null || request.getDocEmail().isEmpty() ||
                request.getPatientId() == null) {
            return ResponseEntity.badRequest().body("Name, prescription, patientId, and docEmail are required parameters.");
        }

        // Create the thread
        ChatThread thread = new ChatThread();
        thread.setName(request.getName());

        thread.setPatientId(request.getPatientId());
        thread.setPrescription(request.getPrescription());
        thread.setDocEmail(request.getDocEmail());

        // Save the thread to the database
        threadService.createThread(thread);

        return ResponseEntity.status(HttpStatus.CREATED).body("Thread created successfully.");
    }
}
