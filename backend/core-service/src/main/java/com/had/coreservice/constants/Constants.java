package com.had.coreservice.constants;

public class Constants {

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
