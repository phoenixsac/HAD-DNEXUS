package com.had.dicomservice.Repository;

import com.had.dicomservice.Entity.ConsultationDicom;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ConsultationDicomRepository extends JpaRepository<ConsultationDicom, Long> {
}