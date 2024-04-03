package com.had.adminservice.repository;

import com.had.adminservice.entity.HealthcareProfessionalsRegistry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HPRRepository extends JpaRepository<HealthcareProfessionalsRegistry, Long> {

    @Query(value = "SELECT * FROM healthcare_professionals_registry WHERE healthcare_professional_id = :upid", nativeQuery = true)

    HealthcareProfessionalsRegistry getByProfessionalId(Long upid);


}
