package com.had.dicomservice.Entity;


import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "consultation_dicom")
public class ConsultationDicom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @Column(name = "consultationId")
    private Long consultationId;

    @Column(name = "dicomFileUid", length = 255)
    private String dicomFileUid;

    @Column(name = "remarks", length = 255)
    private String remarks;

}