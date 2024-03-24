package com.had.adminservice.entity;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "DOCTOR")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "contact", length = 20)
    private Long contact;

    @Column(name = "license_number", length = 50)
    private Long licenseNumber;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "specialization", length = 255)
    private String specialization;

    @Column(name = "isactive")
    private Boolean isActive = true;

    @OneToOne
    @JoinColumn(name = "affiliated_hosp_id", referencedColumnName = "id")
    private Hospital affiliatedHospital;

    // Constructors, getters, and setters
}