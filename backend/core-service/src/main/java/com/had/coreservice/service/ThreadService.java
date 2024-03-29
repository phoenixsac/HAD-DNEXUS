package com.had.coreservice.service;

import com.had.coreservice.entity.ChatThread;
import com.had.coreservice.repository.ThreadRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ThreadService {

    @Autowired
    private ThreadRepository threadRepository;

    @Transactional
    public ChatThread createThread(ChatThread thread) {
        thread.setDateCreated(LocalDateTime.now());
        // Additional validation or business logic can be added here before saving
        return threadRepository.save(thread);
    }

    // You can add more methods for additional business logic
}

