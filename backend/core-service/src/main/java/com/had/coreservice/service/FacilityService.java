package com.had.coreservice.service;

import com.had.coreservice.entity.Consultation;
import com.had.coreservice.entity.Facility;
import com.had.coreservice.repository.ConsultationRepository;
import com.had.coreservice.repository.FacilityRepository;
import com.had.coreservice.repository.PatientRepository;
import com.had.coreservice.responseBody.LabFacilityDropdownResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FacilityService {

    @Autowired
    FacilityRepository facilityRepository;

    @Autowired
    ConsultationRepository consultationRepository;

    @Transactional(readOnly = true)
    public List<LabFacilityDropdownResponseBody> getLabFacilities() {
        try {
            List<Facility> labFacilities = facilityRepository.findAllByTypeIgnoreCase("lab");
            return labFacilities.stream()
                    .map(facility -> LabFacilityDropdownResponseBody.builder()
                            .id(facility.getId())
                            .name(facility.getUser().getFirstName())
                            .build())
                    .collect(Collectors.toList());
        } catch (Exception e) {
            // Log the exception or handle it according to your application's requirements
            throw new RuntimeException("Failed to retrieve lab facilities", e);
        }
    }

    @Transactional
    public void addLabToConsultation(Long consultationId, Long labId) {
        Consultation consultation = consultationRepository.findById(consultationId).orElse(null);
        Facility labFacility = facilityRepository.findByIdAndTypeIgnoreCase(labId, "lab").orElse(null);

        if (consultation != null && labFacility != null) {
            if (consultation.getLabFacility() == null) { // Check if lab facility is null in consultation
                consultation.setLabFacility(labFacility);
                consultationRepository.save(consultation);
            } else {
                throw new IllegalArgumentException("Lab Facility already exists in the consultation");
            }
        } else {
            throw new IllegalArgumentException("Consultation or Lab Facility not found(or Facility not of type lab)");
        }
    }
}
