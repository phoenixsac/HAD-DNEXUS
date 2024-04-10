package com.had.coreservice.responseBody;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ProfessionalRadiologistResponseBody {
    private Long id;
    private String fullName;
}
