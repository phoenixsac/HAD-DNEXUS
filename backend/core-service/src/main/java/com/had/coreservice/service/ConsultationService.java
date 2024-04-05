package com.had.coreservice.service;

import com.had.coreservice.entity.Consultation;
import com.had.coreservice.entity.Professional;
import com.had.coreservice.entity.Patient;
import com.had.coreservice.exception.ConsultationAlreadyClosedException;
import com.had.coreservice.exception.ConsultationNotFoundException;
import com.had.coreservice.repository.ConsultationRepository;
import com.had.coreservice.repository.PatientRepository;
import com.had.coreservice.repository.ProfessionalRepository;
import com.had.coreservice.requestBody.CreateConsultationRequestBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;
import java.util.Set;

@Service
public class ConsultationService {

    @Autowired
    PatientRepository patientRepository;

    @Autowired
    ProfessionalRepository professionalRepository;

    @Autowired
    ConsultationRepository consultationRepository;

    public ResponseEntity<String> createConsultation(CreateConsultationRequestBody requestBody) {
        // Fetch patient from database
        Patient patient = patientRepository.findById(requestBody.getPatientId()).orElse(null);
        if (patient == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Patient not found");
        }

        // Fetch professional from database
        Professional professional = professionalRepository.findById(Long.parseLong(String.valueOf(requestBody.getProfessionalDocId()))).orElse(null);
        if (professional == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Professional not found");
        }

        // Check if professional is a doctor
        if (!"Doctor".equalsIgnoreCase(professional.getSpecialization())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Professional is not authorized to create consultations(Not of doctor type)");
        }

        // Create consultation object
        Consultation consultation = Consultation.builder()
                .name(requestBody.getConsultationName())
                .patient(patient)
                .docProfesionalId(Long.parseLong(String.valueOf(requestBody.getProfessionalDocId())))
                .dateCreated(new Date())
                .status("Ongoing")
                .test(requestBody.getTest())
                .build();

        // Save consultation to database
        consultationRepository.save(consultation);

        return ResponseEntity.status(HttpStatus.CREATED).body("Consultation created successfully");
    }

    @Transactional
    public void addFinalReportToConsultation(Long professionalDocId, Long consultancyId, String finalReport) {
        Consultation consultation = consultationRepository.findById(consultancyId)
                .orElseThrow(() -> new IllegalArgumentException("Consultation not found"));

        // Check if the provided professional is associated with the consultation
        boolean isAssociated = consultation.getDocProfesionalId().equals(professionalDocId);
        if (!isAssociated) {
            throw new IllegalArgumentException("Provided professional ID is not associated with the consultation ID");
        }

        consultation.setFinalReport(finalReport);
        consultationRepository.save(consultation);
    }

    public String getTestByConsultationId(Long consultationId) {
        Optional<Consultation> optionalConsultation = consultationRepository.findById(consultationId);
        if (optionalConsultation.isPresent()) {
            Consultation consultation = optionalConsultation.get();
            return consultation.getTest();
        } else {
            throw new ConsultationNotFoundException("Consultation with ID " + consultationId + " not found.");
        }
    }

    public String getFinalReportByConsultationId(Long consultationId) {
        Optional<Consultation> optionalConsultation = consultationRepository.findById(consultationId);
        if (optionalConsultation.isPresent()) {
            Consultation consultation = optionalConsultation.get();
            return consultation.getFinalReport();
        } else {
            throw new ConsultationNotFoundException("Consultation with ID " + consultationId + " not found.");
        }
    }

    public void closeConsultation(Long consultationId) {
        Optional<Consultation> optionalConsultation = consultationRepository.findById(consultationId);
        if (optionalConsultation.isPresent()) {
            Consultation consultation = optionalConsultation.get();
            if ("completed".equalsIgnoreCase(consultation.getStatus())) {
                throw new ConsultationAlreadyClosedException("Consultation with ID " + consultationId + " is already closed.");
            } else {
                consultation.setStatus("COMPLETED");
                consultationRepository.save(consultation);
            }
        } else {
            throw new ConsultationNotFoundException("Consultation with ID " + consultationId + " not found.");
        }
    }

}
