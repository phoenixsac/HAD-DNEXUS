package com.had.coreservice.service;

import com.had.coreservice.entity.Consultation;
import com.had.coreservice.entity.Professional;
import com.had.coreservice.repository.ConsultationRepository;
import com.had.coreservice.repository.ProfessionalRepository;
import com.had.coreservice.repository.UserRepository;
import com.had.coreservice.responseBody.ProfessionalRadiologistResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProfessionalService {


    @Autowired
    ProfessionalRepository professionalRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    ConsultationRepository consultationRepository;

    @Transactional(readOnly = true)
    public List<ProfessionalRadiologistResponseBody> getRadiologists() {
        try {
            return professionalRepository.findBySpecializationIgnoreCase("radiologist").stream()
                    .map(professional -> ProfessionalRadiologistResponseBody.builder()
                            .id(professional.getId())
                            .fullName(userRepository.findFullNameById(professional.getUser().getId()))
                            .build())
                    .collect(Collectors.toList());
        } catch (DataAccessException ex) {
            // Handle database access exception
            throw new RuntimeException("Error occurred while fetching radiologists", ex);
        } catch (Exception ex) {
            // Handle other exceptions
            throw new RuntimeException("An unexpected error occurred", ex);
        }
    }

    @Transactional
    public void addRadiologistToConsultation(Long consultationId, Long proRadiologistId) {
        Consultation consultation = consultationRepository.findById(consultationId).orElseThrow(() -> new IllegalArgumentException("Consultation with given id does not exist"));
        Professional professional = professionalRepository.findById(proRadiologistId).orElseThrow(() -> new IllegalArgumentException("Professional with given id does not exist"));

        // Check if the professional is a radiologist
        if (!"radiologist".equalsIgnoreCase(professional.getSpecialization())) {
            throw new IllegalArgumentException("Only professional of type radiologist can be added to the consultation");
        }

        consultation.getProfessionals().add(professional);
        consultationRepository.save(consultation);
    }
}
