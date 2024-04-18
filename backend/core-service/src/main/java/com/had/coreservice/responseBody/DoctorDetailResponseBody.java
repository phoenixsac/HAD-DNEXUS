package com.had.coreservice.responseBody;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DoctorDetailResponseBody {
    private Long id;
    private String name;
    private String systemOfMedicine;
    private String qualification;
    private String place_of_work;
}
