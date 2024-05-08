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
public class StudyMetadata {
    private String studyInstanceUID;
    private String studyDate;
    private List<SeriesMetadata> series;

    // Getters and setters
}