package com.had.coreservice.repository;


import com.had.coreservice.entity.ChatThread;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatThreadRepository extends JpaRepository<ChatThread, Long> {
    // Add custom query methods if needed
}
