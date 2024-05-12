package com.had.coreservice.requestBody;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateConsentRequestBody {
    private Integer patientId;
    private Integer entityId;
    private Integer entityType;
    private Integer consultationId;
    private String consentType;
}