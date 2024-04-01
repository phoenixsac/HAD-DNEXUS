DROP DATABASE IF EXISTS dnexus_db;
CREATE DATABASE IF NOT EXISTS dnexus_db;
USE dnexus_db;

DROP TABLE IF EXISTS
healthcare_professionals_registry,
health_facility_registry,
otp_validation,
admin,
user,
patient,
professional,
facility,
professional_patient,
case_table,
;
	

create table healthcare_professionals_registry (
    healthcare_professional_id bigint primary key,
    first_name varchar(255),
	last_name varchar(255),
    specialization varchar(255),
    system_of_medicine varchar(255),
    contact_number bigint,
    email_id varchar(255),
    qualification varchar(255),
    years_of_experience integer,
    status varchar(255),
	affiliated_facility_id bigint DEFAULT NULL,
    place_of_work varchar(255)
);


create table health_facility_registry (
    facility_id varchar(255) primary key,
    facility_name varchar(255),
    system_of_medicine varchar(255),
    email_id varchar(255),
    state_or_ut varchar(255),
    sub_district varchar(255),
    facility_ownership varchar(20),
    facility_type varchar(50),
    contact_number varchar(20), -- using varchar for storing phone number with country code
    country varchar(255),
    district varchar(255),
    facility_region varchar(10)
);

CREATE TABLE `otp_validation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `otp` varchar(6) NOT NULL,
  `expiration_time` timestamp NOT NULL,
  PRIMARY KEY (`id`)
);



CREATE TABLE `user` (
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255),
  `contact` varchar(255),
  `login_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`email`) 
);


CREATE TABLE `patient` (
  `email` varchar(255) NOT NULL, 
  `dob` date DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `blood_grp` varchar(10) DEFAULT NULL,
  `guardian_first_name` varchar(255) DEFAULT NULL,
  `guardian_last_name` varchar(255) DEFAULT NULL,
  `guardian_contact` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`email`) 
);


-- for both doctor and radiologist
CREATE TABLE `professional` (
  `email` varchar(255) NOT NULL,
  `license_number` varchar(50) DEFAULT NULL,
  `experience` int DEFAULT NULL,
  `affiliated_facility_email` varchar(255) DEFAULT NULL,
  `specialization` varchar(255) DEFAULT NULL,
  `isactive` tinyint(1) DEFAULT '1',
  `type` varchar(50),
  PRIMARY KEY (`email`)
);



-- for both hospital and lab
CREATE TABLE `facility` (
  `email` varchar(255) NOT NULL, 
  `ufid` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `sub_district` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `type` varchar(50),
  PRIMARY KEY (`email`) 
);



-- Alter statements
ALTER TABLE `patient`
ADD CONSTRAINT `fk_patient_user_email`
FOREIGN KEY (`email`)
REFERENCES `user` (`email`)
ON DELETE CASCADE
ON UPDATE CASCADE;



ALTER TABLE `professional`
ADD CONSTRAINT `fk_professional_user_email`
FOREIGN KEY (`email`)
REFERENCES `user` (`email`)
ON DELETE CASCADE
ON UPDATE CASCADE;


ALTER TABLE `facility`
ADD CONSTRAINT `fk_facility_user_email`
FOREIGN KEY (`email`)
REFERENCES `user` (`email`)
ON DELETE CASCADE
ON UPDATE CASCADE;



ALTER TABLE `professional`
ADD CONSTRAINT `fk_professional_facility_email`
FOREIGN KEY (`affiliated_facility_email`)
REFERENCES `facility` (`email`)
ON DELETE CASCADE
ON UPDATE CASCADE;

-- Doctor to patient
CREATE TABLE `professional_to_patient` (
  `professional_email` varchar(255) NOT NULL,
  `patient_email` varchar(255) NOT NULL,
  PRIMARY KEY (`professional_email`, `patient_email`)
);

ALTER TABLE `professional_to_patient`
ADD CONSTRAINT `fk_professional_to_patient_professional_email`
FOREIGN KEY (`professional_email`) REFERENCES `professional` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
ADD CONSTRAINT `fk_professional_to_patient_patient_email`
FOREIGN KEY (`patient_email`) REFERENCES `patient` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;


-- we need this, beacause there are so many dicoms in one upload








CREATE TABLE `case_table` (
  `case_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `patient_email` varchar(255) NOT NULL,
  `date_created` datetime NOT NULL,
  `doc_email` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `lab_email` varchar(255) NOT NULL,
  `conclusion` text NOT NULL,
  `test` varchar(255) NOT NULL,
  `lab_upload_id` bigint NOT NULL,
  `lab_remarks` text,
  PRIMARY KEY (`case_id`)
);

ALTER TABLE `case_table`
ADD CONSTRAINT `fk_case_patient_email`
FOREIGN KEY (`patient_email`) REFERENCES `patient` (`email`)
ON DELETE CASCADE
ON UPDATE CASCADE,
ADD CONSTRAINT `fk_case_professional_email`
FOREIGN KEY (`doc_email`) REFERENCES `professional` (`email`)
ON DELETE CASCADE
ON UPDATE CASCADE,
ADD CONSTRAINT `fk_case_facility_email`
FOREIGN KEY (`lab_email`) REFERENCES `facility` (`email`)
ON DELETE CASCADE
ON UPDATE CASCADE;


CREATE TABLE `patient_case` (
  `patient_email` varchar(255) NOT NULL,
  `case_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`patient_email`, `case_id`)
);

ALTER TABLE `patient_case`
ADD CONSTRAINT `fk_patient_case_patient_email`
FOREIGN KEY (`patient_email`) REFERENCES `patient` (`email`)
ON DELETE CASCADE
ON UPDATE CASCADE,
ADD CONSTRAINT `fk_patient_case_case_id`
FOREIGN KEY (`case_id`) REFERENCES `case_table` (`case_id`)
ON DELETE CASCADE
ON UPDATE CASCADE;


CREATE TABLE `professional_case` (
  `professional_email` varchar(255) NOT NULL,
  `case_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`professional_email`, `case_id`)
);


ALTER TABLE `professional_case`
ADD CONSTRAINT `fk_professional_case_professional_email`
FOREIGN KEY (`professional_email`) REFERENCES `professional` (`email`)
ON DELETE CASCADE
ON UPDATE CASCADE,
ADD CONSTRAINT `fk_professional_case_case_id`
FOREIGN KEY (`case_id`) REFERENCES `case_table` (`case_id`)
ON DELETE CASCADE
ON UPDATE CASCADE;

