package com.had.coreservice.service;

import com.had.coreservice.entity.Consultation;
import com.had.coreservice.entity.Facility;
import com.had.coreservice.entity.User;
import com.had.coreservice.repository.ConsultationRepository;
import com.had.coreservice.repository.FacilityRepository;
import com.had.coreservice.repository.PatientRepository;
import com.had.coreservice.responseBody.ConsultationCardDetailResponseBody;
import com.had.coreservice.responseBody.LabDetailsResponseBody;
import com.had.coreservice.responseBody.LabFacilityDropdownResponseBody;
import com.had.coreservice.utility.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;
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

    public LabDetailsResponseBody getLabDetailsForConsultation(Long consultationId) {
        Consultation consultation = consultationRepository.findById(consultationId)
                .orElseThrow(() -> new RuntimeException("Consultation not found with ID: " + consultationId));

        Facility labFacility = consultation.getLabFacility();
        if (labFacility == null || !"lab".equalsIgnoreCase(labFacility.getType())) {
            throw new RuntimeException("Lab facility not found or type is not 'lab' for consultation with ID: " + consultationId);
        }

        User user = labFacility.getUser();
        if (user == null || !user.isActive()) {
            throw new RuntimeException("Lab facility not active with ID: " + labFacility.getId());
        }

        return LabDetailsResponseBody.builder()
                .facilityId(labFacility.getId())
                .state(labFacility.getState())
                .country(labFacility.getCountry())
                .type(labFacility.getType())
                .district(labFacility.getDistrict())
                .firstName(user.getFirstName())
                .contact(user.getContact())
                .build();
    }


    //get consultation list for lab view
    public List<ConsultationCardDetailResponseBody> getConsultationsByFacilityId(Long facilityId) {

        Optional<Facility> facilityOptional = facilityRepository.findById(facilityId);
        if (facilityOptional.isEmpty()) {
            throw new RuntimeException("Facility with ID " + facilityId + " not found.");
        }

        List<Object[]> consultationObjects = facilityRepository.findConsultationDetailsForLab(facilityId);

        return consultationObjects.stream()
                .map(this::mapToConsultationCardDetail)
                .collect(Collectors.toList());
    }

    private ConsultationCardDetailResponseBody mapToConsultationCardDetail(Object[] row) {
        ConsultationCardDetailResponseBody consultationCardDetail = new ConsultationCardDetailResponseBody();
        consultationCardDetail.setConsultationId((Long) row[0]);
        consultationCardDetail.setName((String) row[1]);

        // Convert Timestamp to LocalDateTime
        Timestamp timestamp = (Timestamp) row[2];
        LocalDateTime localDateTime = timestamp.toLocalDateTime();

        consultationCardDetail.setDateCreated(localDateTime);
        consultationCardDetail.setStatus((String) row[3]);
        return consultationCardDetail;
    }

}
