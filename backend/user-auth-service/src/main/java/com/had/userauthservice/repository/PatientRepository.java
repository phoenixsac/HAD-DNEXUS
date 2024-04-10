package com.had.userauthservice.repository;

import com.had.userauthservice.entities.Patient;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PatientRepository extends JpaRepository<Patient, Long> {
    // You can add custom query methods here if needed
//    Optional<Patient> findByEmail(String email);
}