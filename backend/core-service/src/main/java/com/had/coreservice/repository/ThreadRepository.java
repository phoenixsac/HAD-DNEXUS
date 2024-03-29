package com.had.coreservice.repository;

import com.had.coreservice.entity.ChatThread;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ThreadRepository extends JpaRepository<ChatThread, Long> {
    // You can add custom query methods here if needed
}

