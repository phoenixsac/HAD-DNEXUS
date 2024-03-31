package com.had.coreservice.service;

import com.had.coreservice.entity.ChatThread;
import com.had.coreservice.repository.ChatThreadRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ThreadService {

//    @Autowired
//    private ChatThreadRepository threadRepository;


    private final ChatThreadRepository threadRepository;

    // Constructor injection
    @Autowired
    public ThreadService(ChatThreadRepository threadRepository) {
        this.threadRepository = threadRepository;
    }

    @Transactional
    public ChatThread createThread(ChatThread thread) {
        thread.setDateCreated(LocalDateTime.now());
        // Additional validation or business logic can be added here before saving
        return threadRepository.save(thread);
    }

    @Transactional
    public ChatThread findByThreadId(Long id) {
        Optional<ChatThread> threadOptional = threadRepository.findById(id);
        return threadOptional.orElse(null);
    }

    @Transactional
    public ChatThread save(ChatThread thread) {
        return threadRepository.save(thread);
    }
    // You can add more methods for additional business logic
}