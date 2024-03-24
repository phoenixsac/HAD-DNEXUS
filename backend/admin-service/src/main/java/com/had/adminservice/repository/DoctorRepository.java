package com.had.adminservice.repository;

import com.had.adminservice.entity.Doctor;
import com.had.adminservice.entity.HealthcareFacilityRegistry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DoctorRepository extends JpaRepository<Doctor, String> {

    @Query(value = "SELECT * FROM doctor WHERE license_number = :upid", nativeQuery = true)
    Doctor findByUpid(String upid);
}
