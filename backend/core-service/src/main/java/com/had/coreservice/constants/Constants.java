package com.had.coreservice.constants;

public class Constants {


    public static final String SUB_DOCTOR_ACCESS_CONSENT = "Doctor's Consent Access Request";
    public static final String SUB_LAB_ACCESS_CONSENT = "Lab's Consent Access Request";
    public static final String SUB_RADIOLOGIST_ACCESS_CONSENT = "Radiologist's Consent Access Request";


    public static final String ENTITY_TYPE_DOCTOR="DOCTOR";
    public static final String ENTITY_TYPE_RADIOLOGIST="RADIOLOGIST";
    public static final String ENTITY_TYPE_LAB="LAB";



    public static final String DOCTOR_CASE_CONSENT="DOCTOR_CASE_CONSENT";
    public static final String LAB_ADD_CONSENT="LAB_ADD_CONSENT";
    public static final String RADIOLOGIST_ADD_CONSENT="RADIOLOGIST_ADD_CONSENT";

    public static final String GENERAL_DATA_CONSENT =
            "By registering on our platform, you consent to the collection, storage, and processing of your personal and health data.";

    // Consent for doctor creating a case
    public static final String DOCTOR_CASE_CONSENT_TEMPLATE =
            "Dr. %s has initiated a case involving you. By agreeing, you consent to share your data with Dr. %s.";

    // Consent for adding a radiologist to the case
    public static final String RADIOLOGIST_CASE_CONSENT_TEMPLATE =
            "Dr. %s has added Radiologist %s to your case. By agreeing, you consent to share your data with Radiologist %s.";

    // Consent for adding a lab to the case
    public static final String LAB_CASE_CONSENT_TEMPLATE =
            "Dr. %s has added Lab %s to your case. By agreeing, you consent to share your data with Lab %s.";
}
