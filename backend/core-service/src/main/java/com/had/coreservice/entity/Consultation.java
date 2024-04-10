package com.had.coreservice.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "consultation")
public class Consultation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long consultationId;

    @Column(name = "name", columnDefinition = "TEXT")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", referencedColumnName = "id")
    private Patient patient;

    @Column(name = "prof_doc_id")
    private Long docProfesionalId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fac_lab_id", referencedColumnName = "id")
    private Facility labFacility;

    @Column(name = "date_created")
    private Date dateCreated;

    @Column(name = "status")
    private String status;

    @Column(name = "final_report", columnDefinition = "TEXT")
    private String finalReport;

    @Column(name = "test")
    private String test;

//    @Column(name = "fac_lab_upload_id")
//    private Long facLabUploadId;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "professional_consultation",
            joinColumns = @JoinColumn(name = "consultation_id"),
            inverseJoinColumns = @JoinColumn(name = "professional_id")
    )
    private Set<Professional> professionals;

}
