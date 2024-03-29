package com.had.coreservice.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "thread")
public class ChatThread {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "date_created")
    private LocalDateTime dateCreated;

    @Column(name = "patient_id")
    private Long patientId;

    @Column(name = "doc_email")
    private String docEmail;

    private String status;

    @Column(name = "lab_id")
    private Long labId;

    private String conclusion;

    private String prescription;

    // Constructors, getters, and setters

}

