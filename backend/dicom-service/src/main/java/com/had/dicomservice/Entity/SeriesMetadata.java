package com.had.dicomservice.Entity;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SeriesMetadata {
    private String seriesInstanceUID;
    private String seriesDescription;
    private int seriesNumber;
    private String seriesDate;
    private String seriesTime;
    private String modality;
    private List<InstanceMetadata> instances;

    // Getters and setters
}