package com.had.patientservice.repository;

import com.had.patientservice.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PatientRepository extends JpaRepository<Patient, String> {

    @Query(value = "SELECT * FROM patient WHERE email = :email", nativeQuery = true)
    Patient findByEmailId(@Param("email") String email);
}
