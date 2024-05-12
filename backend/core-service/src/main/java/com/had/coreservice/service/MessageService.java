package com.had.coreservice.service;

import com.had.coreservice.entity.Consultation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.had.coreservice.entity.Message;
import com.had.coreservice.repository.MessageRepository;
import com.had.coreservice.requestBody.MessageDTO;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional
    public MessageDTO saveMessage(Long consultationId, Long receiverId, MessageDTO messageDTO) {

        Message message = new Message();
        message.setConsultationId(consultationId);
        message.setSenderId(messageDTO.getSenderId());
        message.setSenderType(messageDTO.getSenderType());
        message.setReceiverId(receiverId);
        message.setReceiverType(messageDTO.getReceiverType());
        message.setMessageContent(messageDTO.getMessageContent());

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = LocalDateTime.now().format(formatter);
        message.setCreatedAt(formattedDateTime);

        // Save the message entity
        Message savedMessage = messageRepository.save(message);

        return convertToDTO(savedMessage);
    }


    // Helper method to convert Message entity to MessageDTO
    private MessageDTO convertToDTO(Message message) {
        return MessageDTO.builder()
                .messageId(message.getMessageId())
                .consultationId(message.getConsultationId())
                .senderType(message.getSenderType())
                .senderId(message.getSenderId())
                .receiverType(message.getReceiverType())
                .receiverId(message.getReceiverId())
                .messageContent(message.getMessageContent())
                .createdAt(message.getCreatedAt())
                .build();
    }

//    @Transactional(readOnly = true)
//    public List<MessageDTO> getMessagesByConsultationId(Long consultationId, int page, int size) {
//        Pageable pageable = PageRequest.of(page, size);
//        Page<Message> messagePage = messageRepository.findByConsultationId(consultationId, pageable);
//        List<MessageDTO> messageDTOs = new ArrayList<>();
//        for (Message message : messagePage.getContent()) {
//            messageDTOs.add(convertToDTO(message));
//        }
//        return messageDTOs;
//    }

    @Transactional(readOnly = true)
    public List<MessageDTO> getMessagesByConsultationIdAndRadiologistId(Long consultationId, Long radiologistId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").ascending());
        Page<Message> messagePage = messageRepository.findByConsultationIdAndRadiologistId(consultationId, radiologistId, pageable);
        List<MessageDTO> messageDTOs = new ArrayList<>();
        for (Message message : messagePage.getContent()) {
            messageDTOs.add(convertToDTO(message));
        }
        return messageDTOs;
    }


}
