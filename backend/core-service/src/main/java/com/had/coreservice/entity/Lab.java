package com.had.coreservice.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "lab")
public class Lab {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String UFID;
    private String name;
    private String contact;
    private String sub_district;
    private String district;
    private String state;
    private String country;
    private String email;

    // Constructors, getters, and setters
}
