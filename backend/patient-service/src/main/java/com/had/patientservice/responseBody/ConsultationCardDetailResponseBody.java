package com.had.patientservice.responseBody;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationCardDetailResponseBody {
    private Long consultationId;
    private LocalDateTime dateCreated;
    private String name;
    private String status;
}
