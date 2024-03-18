package com.had.adminservice.entity;


import lombok.*;


import jakarta.persistence.*;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity
@Table(name = "HOSPITAL")
public class Hospital {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "UFID", length = 255)
    private String ufid;

    @Column(name = "name", length = 255)
    private String name;

    @Column(name = "state", length = 255)
    private String state;

    @Column(name = "contact", length = 20)
    private String contact;

    @Column(name = "sub_district", length = 255)
    private String subDistrict;

    @Column(name = "district", length = 255)
    private String district;

    @Column(name = "country", length = 255)
    private String country;

    // Constructors, getters, and setters
}
