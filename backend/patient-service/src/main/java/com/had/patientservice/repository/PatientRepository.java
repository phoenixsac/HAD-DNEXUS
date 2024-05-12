package com.had.patientservice.repository;

import com.had.patientservice.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, String> {

    @Query(value = "SELECT * FROM patient WHERE email = :email", nativeQuery = true)
    Patient findByEmailId(@Param("email") String email);

    @Query("SELECT c.consultationId, c.name, c.dateCreated, c.status " +
            "FROM Consultation c " +
            "WHERE c.patient.id = :patientId " +
            "ORDER BY c.dateCreated DESC")
    List<Object[]> findConsultationsByPatientId(@Param("patientId") Long patientId);

}
