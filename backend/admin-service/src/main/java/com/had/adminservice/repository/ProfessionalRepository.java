package com.had.adminservice.repository;

import com.had.adminservice.entity.Facility;
import com.had.adminservice.entity.Professional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ProfessionalRepository extends JpaRepository<Professional, Long> {

    List<Professional> findByType(String type);
    @Query(value = "SELECT * FROM professional WHERE license_number = :hpId", nativeQuery = true)
    Optional<Professional> findProfessionalExists(Long hpId);

}
