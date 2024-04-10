package com.had.coreservice.responseBody;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LabDetailsResponseBody {
    private Long facilityId;
    private String state;
    private String country;
    private String type;
    private String district;
    private String firstName;
    private String contact;
}