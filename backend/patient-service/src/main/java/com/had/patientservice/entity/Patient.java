package com.had.patientservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Builder
@Table(name = "PATIENT")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "dob")
    private LocalDate dob;

    @Column(name = "age")
    private int age;

    @Column(name = "gender")
    private String gender;

    @Column(name = "contact")
    private String contact;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "blood_grp")
    private String bloodGrp;

    @Column(name = "guardian_first_name")
    private String guardianFirstName;

    @Column(name = "guardian_last_name")
    private String guardianLastName;

    @Column(name = "guardian_contact")
    private String guardianContact;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;
}