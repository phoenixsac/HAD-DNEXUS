package com.had.adminservice.repository;

import com.had.adminservice.entity.HealthcareFacilityRegistry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HFRRepository extends JpaRepository<HealthcareFacilityRegistry, Long> {

    @Query(value = "SELECT * FROM healthcare_facility_registry WHERE facility_id = :ufid", nativeQuery = true)
    HealthcareFacilityRegistry getByFacilityId(String ufid);

}
