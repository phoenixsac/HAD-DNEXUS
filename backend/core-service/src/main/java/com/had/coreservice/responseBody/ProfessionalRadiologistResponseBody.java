package com.had.coreservice.responseBody;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProfessionalRadiologistResponseBody {
    private Long id;
    private String fullName;
    private String systemOfMedicine;
    private String impression;
}
