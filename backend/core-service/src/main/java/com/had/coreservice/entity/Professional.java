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
@Table(name = "professional")
public class Professional {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "license_number", nullable = false)
    private String licenseNumber;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "affiliated_facility_id")
    private String affiliatedFacilityId;

    @Column(name = "specialization")
    private String specialization;

    @Column(name = "system_of_medicine")
    private String systemOfMedicine;

    @Column(name = "qualification")
    private String qualification;

    @Column(name = "status")
    private String status;

    @Column(name = "place_of_work")
    private String placeOfWork;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToMany(mappedBy = "professionals")
    private Set<Consultation> consultations;

}
