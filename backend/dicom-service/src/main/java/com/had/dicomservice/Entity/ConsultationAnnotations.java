package com.had.dicomservice.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "consultation_annotations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConsultationAnnotations {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long uid;

    @Column(name = "consultationId")
    private Long consultationId;

    @Column(name = "annotationUid")
    private Long annotationUid;
}
