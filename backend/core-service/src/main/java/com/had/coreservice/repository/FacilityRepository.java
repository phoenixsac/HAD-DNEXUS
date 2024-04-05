package com.had.coreservice.repository;

import com.had.coreservice.entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {
    List<Facility> findAllByTypeIgnoreCase(String type);
    Optional<Facility> findByIdAndTypeIgnoreCase(Long id, String type);
}
