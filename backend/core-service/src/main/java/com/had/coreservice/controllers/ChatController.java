package com.had.coreservice.controllers;

import com.had.coreservice.requestBody.MessageDTO;
import com.had.coreservice.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@Controller
@RestController
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    MessageService messageService;

//    @MessageMapping("/chat/{consultationId}")
//    @SendTo("/topic/{consultationId}/messages")
//    public MessageDTO sendMessage(@DestinationVariable Long consultationId, MessageDTO messageDTO) {
//
//        System.out.println(messageDTO.getMessageContent());
//        MessageDTO savedMessage = messageService.saveMessage(consultationId, messageDTO);
//
//        return savedMessage;
//    }


//    @GetMapping("/chat/get-messages/{consultationId}")
//    public ResponseEntity<List<MessageDTO>> getMessagesByConsultationId(
//            @PathVariable Long consultationId,
//            @RequestParam(defaultValue = "0") int page,
//            @RequestParam(defaultValue = "5") int size) { // Change default size to 5
//        List<MessageDTO> messages = messageService.getMessagesByConsultationId(consultationId, page, size);
//        return ResponseEntity.ok(messages);
//    }

    @MessageMapping("/chat/{consultationId}/radiologist/{radiologistId}")
    @SendTo("/topic/{consultationId}/radiologist/{radiologistId}/messages")
    public MessageDTO sendMessageToRadiologist(@DestinationVariable Long consultationId, @DestinationVariable Long radiologistId, MessageDTO messageDTO) {
        System.out.println(messageDTO.getMessageContent());
        return messageService.saveMessage(consultationId, radiologistId, messageDTO);
    }

    @GetMapping("/chat/get-messages/{consultationId}/radiologist/{radiologistId}")
    public ResponseEntity<List<MessageDTO>> getMessagesByConsultationIdAndRadiologistId(
            @PathVariable Long consultationId,
            @PathVariable Long radiologistId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        List<MessageDTO> messages = messageService.getMessagesByConsultationIdAndRadiologistId(consultationId, radiologistId, page, size);
        return ResponseEntity.ok(messages);
    }

}
