package com.had.coreservice.repository;


import com.had.coreservice.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    List<Consultation> findByProfessionalsId(Long docId);

    @Query("SELECT c.patient.id FROM Consultation c WHERE c.consultationId = :consultationId")
    Optional<Long> findPatientIdByConsultationId(Long consultationId);

}
