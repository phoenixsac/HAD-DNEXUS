package com.had.coreservice.service;

import com.had.coreservice.entity.Consultation;
import com.had.coreservice.entity.Professional;
import com.had.coreservice.entity.Patient;
import com.had.coreservice.entity.User;
import com.had.coreservice.exception.ConsultationAlreadyClosedException;
import com.had.coreservice.exception.ConsultationNotFoundException;
import com.had.coreservice.repository.ConsultationRepository;
import com.had.coreservice.repository.PatientRepository;
import com.had.coreservice.repository.ProfessionalRepository;
import com.had.coreservice.requestBody.CreateConsultationRequestBody;
import com.had.coreservice.responseBody.DoctorDetailResponseBody;
import com.had.coreservice.responseBody.PatientResponseBodyForConsultation;
import com.had.coreservice.responseBody.ProfessionalRadiologistResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Optional;

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

    public String getConsultationStatus(Long consultationId) {
        Consultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new RuntimeException("Consultation not found with ID: " + consultationId));
        return consultation.getStatus();
    }

    public PatientResponseBodyForConsultation getPatientDetailsForConsultation(Long consultationId) {
        Consultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new RuntimeException("Consultation not found with ID: " + consultationId));

        Patient patient = consultation.getPatient();
        if (patient == null) {
            throw new RuntimeException("Patient not found for consultation with ID: " + consultationId);
        }

        return PatientResponseBodyForConsultation.builder()
                .id(patient.getId())
                .name(patient.getUser().getFirstName() + " " + patient.getUser().getLastName())
                .email(patient.getUser().getEmail())
                .gender(patient.getGender())
                .age(patient.getAge())
                .address(patient.getAddress())
                .bloodGroup(patient.getBloodGroup())
                .contact(patient.getUser().getContact())
                .build();
    }

    public PatientResponseBodyForConsultation getPatientDetailsByPatientId(Long patientId) {
        Patient patient = patientRepository.findById(patientId)
                .orElseThrow(() -> new RuntimeException("Patient not found with ID: " + patientId));

        return PatientResponseBodyForConsultation.builder()
                .id(patient.getId())
                .name(patient.getUser().getFirstName() + " " + patient.getUser().getLastName())
                .gender(patient.getGender())
                .age(patient.getAge())
                .bloodGroup(patient.getBloodGroup())
                .contact(patient.getGuardianContact())
                .build();
    }

    public void saveFinalReport(Long consultationId, String finalReport) {
        Optional<Consultation> optionalConsultation = consultationRepository.findById(consultationId);

        Consultation consultation = optionalConsultation.orElseThrow(() -> new RuntimeException("Consultation not found with ID: " + consultationId));

        consultation.setFinalReport(finalReport);

        consultationRepository.save(consultation);
    }

    public ProfessionalRadiologistResponseBody getProfessionalDetailsByConsultationId(Long consultationId) {
        Consultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new RuntimeException("Consultation not found"));

        Professional professional = consultation.getProfessionals().stream().findFirst()
                .orElseThrow(() -> new RuntimeException("No radiologist found for this consultation"));

        return ProfessionalRadiologistResponseBody.builder()
                .id(professional.getId())
                .fullName(professional.getUser().getFirstName() + " " + professional.getUser().getLastName())
                .systemOfMedicine(professional.getSystemOfMedicine())
               // .impression(consultation.getFinalReport()) // Assuming finalReport holds the impression
                .build();
    }

    public DoctorDetailResponseBody getDoctorDetailsByConsultationId(Long consultationId) {
        Optional<Consultation> consultationOptional = consultationRepository.findById(consultationId);
        if (consultationOptional.isPresent()) {
            Consultation consultation = consultationOptional.get();
            Long docId = consultation.getDocProfesionalId();
            if (docId != null) {
                Professional professional = professionalRepository.findById(docId).orElseThrow(() ->
                        new RuntimeException("Doctor not found for the given ID"));
                User user = professional.getUser();
                if (user != null) {
                    String doctorName = user.getFirstName() + " " + user.getLastName();
                    return DoctorDetailResponseBody.builder()
                            .id(docId)
                            .name(doctorName)
                            .systemOfMedicine(professional.getSystemOfMedicine())
                            .place_of_work(professional.getPlaceOfWork())
                            .qualification(professional.getQualification())
                            .build();
                } else {
                    throw new RuntimeException("User details not found for the doctor");
                }
            } else {
                throw new RuntimeException("No doctor found for the given consultation ID");
            }
        } else {
            throw new RuntimeException("Consultation not found for the given ID");
        }
    }


}
