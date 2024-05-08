package com.had.dicomservice.Dto;


import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SaveDicomRequestBody {
    private String remarks;
    private Long consultationId;
}
