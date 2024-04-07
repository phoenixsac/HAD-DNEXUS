package com.had.coreservice.controllers;

import com.had.coreservice.entity.Message;
import com.had.coreservice.requestBody.MessageDTO;
import com.had.coreservice.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
//    @SendTo("/topic/messages/{consultationId}")
//    public MessageDTO sendMessage(@DestinationVariable Long consultationId, MessageDTO message) {
//        // Validate consultationId, sender, and receiver
//        // Save message to the database
//        return message;
//    }

    @MessageMapping("/chat/{consultationId}")
    @SendTo("/topic/{consultationId}/messages")
    public MessageDTO sendMessage(@DestinationVariable Long consultationId, MessageDTO messageDTO) {

        System.out.println(messageDTO.getMessageContent());
        MessageDTO savedMessage = messageService.saveMessage(consultationId, messageDTO);

        // Publish the saved message to the corresponding WebSocket topic
//        messagingTemplate.convertAndSend("/{consultationId}/messages" + consultationId, savedMessage);
        return messageDTO;
    }

//    @GetMapping("/consultation/{consultationId}/messages")
//    public ResponseEntity<List<MessageDTO>> getMessagesForConsultation(@PathVariable Long consultationId) {
//        List<MessageDTO> messages = messageService.getMessagesForConsultation(consultationId);
//        return ResponseEntity.ok(messages);
//    }

//    @Autowired
//    private SimpMessagingTemplate simpMessagingTemplate;
//
//    @MessageMapping("/message")
//    @SendTo("/chatroom/public")
//    public Message receiveMessage(@Payload Message message){
//        return message;
//    }
//
//    @MessageMapping("/private-message")
//    public Message recMessage(@Payload Message message){
//        simpMessagingTemplate.convertAndSendToUser(String.valueOf(message.getReceiverId()),"/private",message);
//        System.out.println(message.toString());
//        return message;
//    }
}
