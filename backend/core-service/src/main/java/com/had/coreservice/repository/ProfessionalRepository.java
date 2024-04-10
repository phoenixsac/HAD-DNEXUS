package com.had.coreservice.repository;


import com.had.coreservice.entity.Consultation;
import com.had.coreservice.entity.Professional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessionalRepository extends JpaRepository<Professional, Long> {
    List<Professional> findBySpecializationIgnoreCase(String specialization);

//    @Query("SELECT DISTINCT p.id, u.firstName, u.lastName, p.gender, p.age, p.bloodGroup, u.contact " +
//            "FROM Consultation c " +
//            "JOIN Patient p ON c.patient.id = p.id " +
//            "JOIN User u ON u.id = p.user.id " +
//            "WHERE c.docProfesionalId = :professionalId")
//    List<Object[]> findPatientDetailsByProfessionalId(Long professionalId);

    @Query("SELECT DISTINCT p.id, u.firstName, u.lastName, p.gender, p.age, p.bloodGroup, u.contact, c.dateCreated " +
            "FROM Consultation c " +
            "JOIN Patient p ON c.patient.id = p.id " +
            "JOIN User u ON u.id = p.user.id " +
            "WHERE c.docProfesionalId = :professionalId " +
            "ORDER BY c.dateCreated DESC") // Order by dateCreated in descending order
    List<Object[]> findPatientDetailsByProfessionalId(Long professionalId);


    @Query("SELECT DISTINCT c.consultationId, c.name, c.dateCreated, c.status " +
            "FROM Consultation c " +
            "WHERE c.docProfesionalId = :professionalId AND c.patient.id = :patientId " +
            "ORDER BY c.dateCreated DESC")
    List<Object[]> findConsultationDetailsByProfessionalIdAndPatientId(Long professionalId, Long patientId);

    @Query("SELECT c.consultationId, c.name, c.dateCreated, c.status " +
            "FROM Consultation c " +
            "WHERE c.consultationId IN (SELECT DISTINCT pc.consultationId FROM Professional p JOIN p.consultations pc WHERE p.id = :professionalId) " +
            "ORDER BY c.dateCreated DESC")
    List<Object[]> findConsultationDetailsByProfessionalId(Long professionalId);



}
