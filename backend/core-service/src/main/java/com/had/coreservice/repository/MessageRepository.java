package com.had.coreservice.repository;

import com.had.coreservice.entity.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
//    Page<Message> findByConsultationId(Long consultationId, Pageable pageable);
    @Query("SELECT m FROM Message m WHERE m.consultationId = ?1")
    Page<Message> findByConsultationId(Long consultationId, Pageable pageable);

    @Query("SELECT m FROM Message m WHERE m.consultationId = ?1 AND (m.senderId = ?2 OR m.receiverId = ?2)")
    Page<Message> findByConsultationIdAndRadiologistId(Long consultationId, Long radiologistId, Pageable pageable);
}
