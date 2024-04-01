package com.had.coreservice.requestBody;

public class CreateThreadRequest {

    private String name;
    private Long patientId;
    private String prescription;
    private String docEmail;

    // Constructors, getters, and setters
    // You can also add validation annotations here if needed

    public CreateThreadRequest() {
    }

    public CreateThreadRequest(String name, Long patientId, String prescription, String docEmail) {
        this.name = name;
        this.patientId = patientId;
        this.prescription = prescription;
        this.docEmail = docEmail;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPatientId() {
        return patientId;
    }

    public void setPatientId(Long patientId) {
        this.patientId = patientId;
    }

    public String getPrescription() {
        return prescription;
    }

    public void setPrescription(String prescription) {
        this.prescription = prescription;
    }

    public String getDocEmail() {
        return docEmail;
    }

    public void setDocEmail(String docEmail) {
        this.docEmail = docEmail;
    }
}

