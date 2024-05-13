package com.had.coreservice.entity;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "consent")
public class Consent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "consent_id")
    private Long id;

    @Column(name = "patient_id")
    private Long patientId;

    @Column(name = "entity_id")
    private Long entityId;

    @Column(name = "entity_type")
    private String entityType;

    @Column(name = "consultation_id")
    private Long consultationId;

    @Column(name = "consent_type")
    private String consentType;

    @Enumerated(EnumType.STRING)
    @Column(name = "consent_status")
    private ConsentStatus consentStatus;

    @Column(name = "consent_date")
    private LocalDateTime consentDate;

    @Column(name = "consent_expires")
    private LocalDateTime consentExpiry;

    @Column(name = "consent_message", columnDefinition = "TEXT")
    private String consentMessage; // New field for storing consent message

    @Column(name = "created_at", updatable = false, columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @Column(name = "updated_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP")
    private LocalDateTime updatedAt;
}
