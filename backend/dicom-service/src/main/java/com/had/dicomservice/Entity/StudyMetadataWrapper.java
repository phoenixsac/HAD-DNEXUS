package com.had.dicomservice.Entity;

import com.had.dicomservice.Entity.StudyMetadata;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudyMetadataWrapper {
    private List<StudyMetadata> studies;

    public List<StudyMetadata> getStudies() {
        return studies;
    }

    public void setStudies(List<StudyMetadata> studies) {
        this.studies = studies;
    }
}
