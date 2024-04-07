package com.had.coreservice.service;

import com.had.coreservice.entity.Consultation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.had.coreservice.entity.Message;
import com.had.coreservice.repository.MessageRepository;
import com.had.coreservice.requestBody.MessageDTO;

import java.util.Date;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional
    public MessageDTO saveMessage(Long consultationId, MessageDTO messageDTO) {
        // Convert MessageDTO to Message entity
        Message message = new Message();
        message.setConsultationId(consultationId);
        message.setSenderId(messageDTO.getSenderId());
        message.setReceiverId(messageDTO.getReceiverId());
        message.setMessageContent(messageDTO.getMessageContent());
        message.setCreatedAt("new Date()"); // Use parameterless constructor to set the current date and time

        // Save the message entity
        Message savedMessage = messageRepository.save(message);

        // Convert saved Message entity back to MessageDTO and return
        return convertToDTO(savedMessage);
    }

    // Helper method to convert Message entity to MessageDTO
    private MessageDTO convertToDTO(Message message) {
        return MessageDTO.builder()
                .messageId(message.getMessageId())
                .consultationId(message.getConsultationId())
                .senderId(message.getSenderId())
                .receiverId(message.getReceiverId())
                .messageContent(message.getMessageContent())
//                .createdAt(message.getCreatedAt())
                .build();
    }
}
