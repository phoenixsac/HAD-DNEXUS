package com.had.coreservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long messageId;

    @Column(name = "consultation_id")
    private Long consultationId;

    @Column(name = "sender_id")
    private Long senderId;

    @Column(name = "receiver_id")
    private Long receiverId;

    @Column(name = "message_content")
    private String messageContent;

    @Column(name = "created_at")
    private String createdAt;
}
