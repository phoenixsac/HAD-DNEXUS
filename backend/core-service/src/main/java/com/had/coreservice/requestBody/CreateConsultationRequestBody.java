package com.had.coreservice.requestBody;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateConsultationRequestBody {

    private String consultationName;
    private Long patientId;
    private String test;
    private Long professionalDocId;

}
