package com.had.coreservice.requestBody;

import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {

    private Long messageId;
    private Long consultationId;
    private Long senderId;
    private String senderType;
    private String receiverType;
    private Long receiverId;
    private String messageContent;
    private String createdAt;
}