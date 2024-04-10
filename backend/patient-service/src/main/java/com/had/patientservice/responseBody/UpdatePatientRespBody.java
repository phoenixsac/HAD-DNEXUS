package com.had.patientservice.requestBody;


import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UpdatePatientRespBody {
    private String firstName;
    private String lastName;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;

    private String gender;
    private String contact;
    private String email;
    private String address;
    private String bloodGrp;
    private String guardianFirstName;
    private String guardianLastName;
    private String guardianContact;
}
