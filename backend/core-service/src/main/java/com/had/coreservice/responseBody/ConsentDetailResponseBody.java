package com.had.coreservice.responseBody;

import com.had.coreservice.entity.ConsentStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ConsentDetailResponseBody {
    private Long id;
    private String patientName;
    private String entityName;
    private String entityType;
    private Long consultationId;
    private String consentType;
    private ConsentStatus consentStatus;
    private LocalDateTime consentDate;
    private LocalDateTime consentExpires;
    private String consentMessage;
}