package com.had.userauthservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "PATIENT")
public class Patient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

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


    // Builder class
    public static class Builder {
        private Patient patient;

        public Builder() {
            patient = new Patient();
        }

        public Builder withFirstName(String firstName) {
            patient.firstName = firstName;
            return this;
        }

        public Builder withLastName(String lastName) {
            patient.lastName = lastName;
            return this;
        }

        public Builder withDob(LocalDate dob) {
            patient.dob = dob;
            // Calculate age if needed
            // patient.age = calculateAge(dob);
            return this;
        }

        public Builder withAge(int age) {
            patient.age = age;
            return this;
        }

        public Builder withGender(String gender) {
            patient.gender = gender;
            return this;
        }

        public Builder withContact(String contact) {
            patient.contact = contact;
            return this;
        }

        public Builder withEmail(String email) {
            patient.email = email;
            return this;
        }

        public Builder withAddress(String address) {
            patient.address = address;
            return this;
        }

        public Builder withBloodGrp(String bloodGrp) {
            patient.bloodGrp = bloodGrp;
            return this;
        }

        public Builder withGuardianFirstName(String guardianFirstName) {
            patient.guardianFirstName = guardianFirstName;
            return this;
        }

        public Builder withGuardianLastName(String guardianLastName) {
            patient.guardianLastName = guardianLastName;
            return this;
        }

        public Builder withGuardianContact(String guardianContact) {
            patient.guardianContact = guardianContact;
            return this;
        }

        public Patient build() {
            return patient;
        }
    }

}