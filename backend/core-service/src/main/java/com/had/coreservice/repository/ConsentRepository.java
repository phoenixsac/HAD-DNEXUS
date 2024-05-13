package com.had.coreservice.repository;


import com.had.coreservice.entity.Consent;
import com.had.coreservice.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConsentRepository extends JpaRepository<Consent, Long> {

    @Query("SELECT c FROM Consent c WHERE c.patientId = :patientId")
    Optional<List<Consent>> findListOfConsentsByPatientId(@Param("patientId") Long patientId);

    List<Consent> findByConsultationId(Long consultationId);

    Consent findByConsultationIdAndEntityIdAndEntityTypeIgnoreCase(Long consultationId, Long entityId, String entityType);


//    void findConsentStatusByConsultationIdAndType(Long aLong, String doctorCaseConsent);
//    Optional<Consent> findFirstByConsentTypeAndConsultationId(String consentType, Long consultationId);
}
