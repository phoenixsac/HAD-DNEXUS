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
    private Long receiverId;
    private String messageContent;
//    private Date createdAt;
}