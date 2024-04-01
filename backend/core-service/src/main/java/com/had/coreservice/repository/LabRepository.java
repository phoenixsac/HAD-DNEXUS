package com.had.coreservice.repository;

import com.had.coreservice.entity.Lab;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LabRepository extends JpaRepository<Lab, Long> {
    // Add custom query methods if needed
}
