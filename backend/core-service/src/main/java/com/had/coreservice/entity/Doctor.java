package com.had.coreservice.entity;

import jakarta.persistence.*;


@Entity
@Table(name = "doctor")
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String contact;
    private String email;
    private String licenseNumber;
    private Integer experience;
    private Long affiliatedHospId;
    private String specialization;
    private Boolean isActive = true;

    // Constructors
    public Doctor() {
    }

    public Doctor(String name, String contact, String email, String licenseNumber, Integer experience, Long affiliatedHospId, String specialization) {
        this.name = name;
        this.contact = contact;
        this.email = email;
        this.licenseNumber = licenseNumber;
        this.experience = experience;
        this.affiliatedHospId = affiliatedHospId;
        this.specialization = specialization;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLicenseNumber() {
        return licenseNumber;
    }

    public void setLicenseNumber(String licenseNumber) {
        this.licenseNumber = licenseNumber;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }

    public Long getAffiliatedHospId() {
        return affiliatedHospId;
    }

    public void setAffiliatedHospId(Long affiliatedHospId) {
        this.affiliatedHospId = affiliatedHospId;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }

    @Override
    public String toString() {
        return "Doctor{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", contact='" + contact + '\'' +
                ", email='" + email + '\'' +
                ", licenseNumber='" + licenseNumber + '\'' +
                ", experience=" + experience +
                ", affiliatedHospId=" + affiliatedHospId +
                ", specialization='" + specialization + '\'' +
                ", isActive=" + isActive +
                '}';
    }
}

