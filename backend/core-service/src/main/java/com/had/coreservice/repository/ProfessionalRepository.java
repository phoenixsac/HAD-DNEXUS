package com.had.coreservice.repository;


import com.had.coreservice.entity.Professional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfessionalRepository extends JpaRepository<Professional, Long> {
    List<Professional> findBySpecializationIgnoreCase(String specialization);
}
