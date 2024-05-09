package com.had.coreservice.repository;


import com.had.coreservice.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {

    @Query("SELECT u.email FROM User u JOIN Patient p ON u.id = p.user.id WHERE p.id = :patientId")
    Optional<String> findPatientEmailByUserId(@Param("patientId") Long patientId);


    @Query("SELECT CONCAT(u.firstName, ' ', u.lastName) FROM User u JOIN Patient p ON p.user.id = u.id WHERE p.id = :patientId")
    Optional<String> findNameById(@Param("patientId") Long patientId);


}