package com.had.userauthservice.requestBody;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PatientSignupReqBody {

    @JsonProperty("first_name")
    private String firstName;

    @JsonProperty("last_name")
    private String lastName;

    @JsonProperty("dob")
    private LocalDate dob;

    @JsonProperty("gender")
    private String gender;

    @JsonProperty("contact")
    private String contact;

    @JsonProperty("email")
    private String email;

    @JsonProperty("address")
    private String address;

    @JsonProperty("blood_grp")
    private String bloodGrp;

    @JsonProperty("guardian_first_name")
    private String guardianFirstName;

    @JsonProperty("guardian_last_name")
    private String guardianLastName;

    @JsonProperty("guardian_contact")
    private String guardianContact;

}









