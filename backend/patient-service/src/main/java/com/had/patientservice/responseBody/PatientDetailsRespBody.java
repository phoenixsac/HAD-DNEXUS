package com.had.patientservice.responseBody;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class PatientDetailsRespBody {
    private long id;
    private String firstName;
    private String lastName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;

    private int age;
    private String gender;
    private String contact;
    private String email;
    private String address;
    private String bloodGrp;
    private String guardianFirstName;
    private String guardianLastName;
    private String guardianContact;

}
