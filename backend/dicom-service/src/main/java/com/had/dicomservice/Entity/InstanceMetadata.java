package com.had.dicomservice.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.dcm4che3.data.Attributes;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class InstanceMetadata {
    private Map<String, Object> metadata; // Change metadata type to Map
    private String url;
    private String filePath;

    // Additional constructor to set metadata directly
    public InstanceMetadata(Attributes attrs) {
        setMetadata(attrs);
    }

    // Method to set metadata from Attributes object
    public void setMetadata(Attributes attrs) {
        this.metadata = new HashMap<>();
        for (int tag : attrs.tags()) {
            this.metadata.put(Integer.toHexString(tag), attrs.getString(tag)); // Convert tag to hexadecimal string
        }
    }
}
