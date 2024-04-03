package com.had.adminservice.entity;


import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "professional")
public class Professional {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "license_number", length = 50)
    private Long licenseNumber;

    @Column(name = "experience")
    private Integer experience;

    @Column(name = "affiliated_facility_id")
    private String affiliatedFacilityId;

    @Column(name = "specialization", length = 255)
    private String specialization;

    @Column(name = "type")
    private String type;


    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

}
