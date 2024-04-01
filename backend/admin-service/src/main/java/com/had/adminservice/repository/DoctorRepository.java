package com.had.adminservice.repository;

import com.had.adminservice.entity.Doctor;
import com.had.adminservice.entity.HealthcareFacilityRegistry;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    @Query(value = "SELECT * FROM doctor WHERE license_number = :upid", nativeQuery = true)
    Doctor findByUpid(Long upid);

    @Query(value = "SELECT * FROM doctor WHERE id = :id", nativeQuery = true)
    Doctor findByDocId(Long id);

//    @Transactional
//    @Modifying
//    @Query("UPDATE user u SET u.login_id = NULL, u.password = NULL WHERE u.email IN (SELECT d.email_id FROM doctor d WHERE d.id = :id)")
//    void updateDoctorCredentialsToNull(Long id);


}
