package com.had.dicomservice.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DicomMetadataRequestBody {
    private String studyFolderPath;
    private String dicomServerUrl;
    private String outputJsonFilePath;

}
