DROP DATABASE IF EXISTS dnexus_db;
CREATE DATABASE IF NOT EXISTS dnexus_db;
USE dnexus_db;

DROP TABLE IF EXISTS
    healthcare_professionals_registry,
    health_facility_registry,
    otp_validation,
    user,
    patient,
    professional,
    facility,
    professional_patient,
    consultation
;

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


create table healthcare_professionals_registry (
                                                   healthcare_professional_id bigint primary key,
                                                   first_name varchar(255),
                                                   last_name varchar(255),
                                                   specialization varchar(255),
                                                   system_of_medicine varchar(255),
                                                   contact_number varchar(20),
                                                   email_id varchar(255),
                                                   qualification varchar(255),
                                                   years_of_experience integer,
                                                   status varchar(255),
                                                   affiliated_facility_id varchar(255) DEFAULT NULL,
                                                   place_of_work varchar(255)
);


CREATE TABLE `otp_validation` (
                                  `id` BIGINT NOT NULL AUTO_INCREMENT,
                                  `email` varchar(255) NOT NULL,
                                  `otp` varchar(6) NOT NULL,
                                  `expiration_time` timestamp NOT NULL,
                                  PRIMARY KEY (`id`)
);

CREATE TABLE `user` (
                        `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
                        `email` varchar(255) UNIQUE NOT NULL,
                        `first_name` varchar(255) NOT NULL,
                        `last_name` varchar(255),
                        `contact` varchar(255),
                        `login_id` varchar(255) UNIQUE NOT NULL,
                        `password` varchar(255) NOT NULL,
                        `type` varchar(255) NOT NULL,
                        `is_active` TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE `patient` (
                           `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
                           `dob` DATE DEFAULT NULL,
                           `age` INT DEFAULT NULL,
                           `gender` VARCHAR(10) DEFAULT NULL,
                           `address` VARCHAR(255) DEFAULT NULL,
                           `blood_grp` VARCHAR(10) DEFAULT NULL,
                           `guardian_first_name` VARCHAR(255) DEFAULT NULL,
                           `guardian_last_name` VARCHAR(255) DEFAULT NULL,
                           `guardian_contact` VARCHAR(20) DEFAULT NULL,
                           `user_id` BIGINT NOT NULL,
                           UNIQUE KEY `pat_unique_user_id` (`user_id`),
                           FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE professional (
                              id BIGINT AUTO_INCREMENT PRIMARY KEY,
                              license_number VARCHAR(50) NOT NULL,
                              experience INT DEFAULT NULL,
                              affiliated_facility_id varchar(255) DEFAULT NULL,
                              specialization VARCHAR(255) DEFAULT NULL,
                              system_of_medicine VARCHAR(255) DEFAULT NULL,
                              user_id BIGINT NOT NULL,
                              qualification VARCHAR(255) DEFAULT NULL,
                              status VARCHAR(255) DEFAULT NULL,
                              place_of_work VARCHAR(255) DEFAULT NULL
);

CREATE TABLE `facility` (
                            `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
                            `ufid` varchar(255) UNIQUE NOT NULL,
                            `state` varchar(255) DEFAULT NULL,
                            `district` varchar(255) DEFAULT NULL,
                            `sub_district` varchar(255) DEFAULT NULL,
                            `country` varchar(255) DEFAULT NULL,
                            `type` varchar(50),
                            `user_id` BIGINT NOT NULL,
                            UNIQUE KEY `fac_unique_user_id` (`user_id`),
                            FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `consultation` (
                                `id` BIGINT AUTO_INCREMENT PRIMARY KEY,
                                `name` VARCHAR(255) NOT NULL,
                                `patient_id` BIGINT NOT NULL,
                                `date_created` DATETIME NOT NULL,
                                `prof_doc_id` BIGINT NOT NULL,
                                `status` VARCHAR(255) NOT NULL,
                               `final_report` TEXT,
                                `test` TEXT NOT NULL,
                                `fac_lab_id` BIGINT
);

CREATE TABLE message (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         consultation_id BIGINT,
                         sender_id BIGINT,
                         receiver_id BIGINT,
                         message_content TEXT,
                         created_at DATETIME,
                         FOREIGN KEY (consultation_id) REFERENCES consultation(id),
                         FOREIGN KEY (sender_id) REFERENCES professional(id),
                         FOREIGN KEY (receiver_id) REFERENCES professional(id)
);

ALTER TABLE `patient`
    ADD CONSTRAINT `fk_patient_user`
        FOREIGN KEY (`user_id`)
            REFERENCES `user` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE `professional`
    ADD CONSTRAINT `fk_professional_user_id`
        FOREIGN KEY (`user_id`)
            REFERENCES `user` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE `facility`
    ADD CONSTRAINT `fk_facility_user`
        FOREIGN KEY (`user_id`)
            REFERENCES `user` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;

ALTER TABLE `professional`
    ADD CONSTRAINT `fk_professional_facility_id`
        FOREIGN KEY (`affiliated_facility_id`)
            REFERENCES `facility` (`ufid`)
            ON DELETE CASCADE
            ON UPDATE CASCADE;


ALTER TABLE `consultation`
    ADD CONSTRAINT `fk_consultation_patient_id`
        FOREIGN KEY (`patient_id`) REFERENCES `patient` (`id`)
            ON DELETE CASCADE
            ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_consultation_professional_doc_id`
    FOREIGN KEY (`prof_doc_id`) REFERENCES `professional` (`id`)
            ON DELETE CASCADE ON UPDATE CASCADE,
    ADD CONSTRAINT `fk_consultation_facility_lab_id`
    FOREIGN KEY (`fac_lab_id`) REFERENCES `facility` (`id`)
            ON DELETE CASCADE ON UPDATE CASCADE;

insert into health_facility_registry values
                                         ('hospitalpuduchery@ch.ndhm', 'city general hospital', 'allopathic', 'info@cityhospital.com', 'statea', 'subdista', 'private', 'hospital', '+91 1234567890', 'countryx', 'district1', 'urban'),
                                         ('rurallab001@ch.ndhm', 'rural diagnostics lab 1', 'radiology', 'info@rurallab1.com', 'stateb', 'subdistb', 'public', 'lab', '+91 9876543210', 'countryy', 'district2', 'rural'),
                                         ('coastalcenter@ch.ndhm', 'coastal medical center', 'homeopathic', 'info@coastalcenter.com', 'statec', 'subdistc', 'private', 'hospital', '+91 5647382910', 'countryz', 'district3', 'urban'),
                                         ('healthscan002@ch.ndhm', 'health scan diagnostics 2', 'radiology', 'info@healthscan2.com', 'stated', 'subdistd', 'public', 'lab', '+91 8765432109', 'countryw', 'district4', 'rural'),
                                         ('metrocare003@ch.ndhm', 'metro care hospital 3', 'allopathic', 'info@metrocare3.com', 'statee', 'subdiste', 'private', 'hospital', '+91 6543210987', 'countryv', 'district5', 'urban'),
                                         ('techdiagnostics004@ch.ndhm', 'tech diagnostic services 4', 'radiology', 'info@techdiagnostics4.com', 'statef', 'subdistf', 'public', 'lab', '+91 2345678901', 'countryu', 'district6', 'rural'),
                                         ('highlandcenter@ch.ndhm', 'highland medical center', 'homeopathic', 'info@highlandcenter.com', 'stateg', 'subdistg', 'private', 'hospital', '+91 1098765432', 'countryt', 'district7', 'urban'),
                                         ('countrysidediagnostics006@ch.ndhm', 'countryside diagnostics 6', 'radiology', 'info@countrysidediagnostics6.com', 'stateh', 'subdisth', 'public', 'lab', '+91 7654321098', 'countrys', 'district8', 'rural'),
                                         ('sunrisehospital007@ch.ndhm', 'sunrise hospital 7', 'allopathic', 'info@sunrisehospital7.com', 'statei', 'subdisti', 'private', 'hospital', '+91 8901234567', 'countryr', 'district9', 'urban'),
                                         ('greenvalleycenter@ch.ndhm', 'green valley medical center', 'radiology', 'info@greenvalleycenter.com', 'statej', 'subdistj', 'public', 'hospital', '+91 5432109876', 'countryq', 'district10', 'rural'),
                                         ('rurallab011@ch.ndhm', 'rural diagnostics lab 11', 'radiology', 'info@rurallab11.com', 'statek', 'subdistk', 'public', 'lab', '+91 1122334455', 'countryp', 'district11', 'rural'),
                                         ('modernmedicalcenter@ch.ndhm', 'modern medical center', 'ayurvedic', 'info@modernmedicalcenter.com', 'statel', 'subdistl', 'private', 'hospital', '+91 9988776655', 'countryo', 'district12', 'urban'),
                                         ('techdiagnostics013@ch.ndhm', 'tech diagnostic services 13', 'radiology', 'info@techdiagnostics13.com', 'statem', 'subdistm', 'public', 'lab', '+91 1212121212', 'countryn', 'district13', 'rural'),
                                         ('communityhospital014@ch.ndhm', 'community hospital 14', 'radiology', 'info@communityhospital14.com', 'stateo', 'subdisto', 'private', 'hospital', '+91 3434343434', 'countrym', 'district14', 'urban'),
                                         ('healthscan015@ch.ndhm', 'health scan diagnostics 15', 'radiology', 'info@healthscan15.com', 'statep', 'subdistp', 'public', 'lab', '+91 5656565656', 'countryl', 'district15', 'rural');

INSERT INTO health_facility_registry VALUES
                                         ('rurallab016@ch.ndhm', 'rural diagnostics lab 16', 'pathology', 'info@rurallab16.com', 'stateq', 'subdistq', 'public', 'lab', '+91 7878787878', 'countryk', 'district16', 'rural'),
                                         ('medicenter017@ch.ndhm', 'medicenter 17', 'allopathic', 'info@medicenter17.com', 'stater', 'subdistr', 'private', 'hospital', '+91 2323232323', 'countryj', 'district17', 'urban'),
                                         ('advancedlab018@ch.ndhm', 'advanced diagnostics lab 18', 'radiology', 'info@advancedlab18.com', 'states', 'subdists', 'public', 'lab', '+91 9494949494', 'countryi', 'district18', 'rural'),
                                         ('cityhospital019@ch.ndhm', 'city hospital 19', 'allopathic', 'info@cityhospital19.com', 'statet', 'subdistt', 'private', 'hospital', '+91 6565656565', 'countryh', 'district19', 'urban'),
                                         ('greendiagnostics020@ch.ndhm', 'green diagnostics center 20', 'radiology', 'info@greendiagnostics20.com', 'stateu', 'subdistu', 'public', 'lab', '+91 5757575757', 'countryg', 'district20', 'rural');



INSERT INTO healthcare_professionals_registry VALUES
                                                  (12345678901234, 'john', 'doe', 'doctor', 'allopathic', 1234567890, 'john.doe@example.com', 'md', 10, 'teaching', 'hospitalpuduchery@ch.ndhm', 'city general hospital'),
                                                  (23456789012345, 'jane', 'smith', 'doctor', 'allopathic', 2345678901, 'jane.smith@example.com', 'md', 15, 'research', 'techdiagnostics004@ch.ndhm', 'tech diagnostic services 4'),
                                                  (34567890123456, 'david', 'johnson', 'doctor', 'allopathic', 3456789012, 'david.johnson@example.com', 'md', 12, 'research', 'communityhospital014@ch.ndhm', 'community hospital 14'),
                                                  (45678901234567, 'emily', 'brown', 'doctor', 'allopathic', 4567890123, 'emily.brown@example.com', 'md', 8, 'teaching', 'rurallab001@ch.ndhm', 'rural diagnostics lab 1'),
                                                  (56789012345678, 'michael', 'wilson', 'radiologist', 'radiology', 5678901234, 'michael.wilson@example.com', 'md', 20, 'research', 'healthscan002@ch.ndhm', 'health scan diagnostics 2'),
                                                  (67890123456789, 'sarah', 'martinez', 'doctor', 'allopathic', 6789012345, 'sarah.martinez@example.com', 'md', 18, 'teaching', 'countrysidediagnostics006@ch.ndhm', 'countryside diagnostics 6'),
                                                  (78901234567890, 'christopher', 'taylor', 'doctor', 'allopathic', 7890123456, 'christopher.taylor@example.com', 'md', 14, 'research', 'sunrisehospital007@ch.ndhm', 'sunrise hospital 7'),
                                                  (89012345678901, 'amanda', 'anderson', 'doctor', 'allopathic', 8901234567, 'amanda.anderson@example.com', 'md', 11, 'teaching', 'healthscan015@ch.ndhm', 'health scan diagnostics 15'),
                                                  (90123456789012, 'daniel', 'thomas', 'doctor', 'allopathic', 9012345678, 'daniel.thomas@example.com', 'md', 9, 'research', 'rurallab011@ch.ndhm', 'rural diagnostics lab 11'),
                                                  (10123456789012, 'jennifer', 'rodriguez', 'radiologist', 'radiology', 1012345678, 'jennifer.rodriguez@example.com', 'md', 16, 'teaching', 'techdiagnostics013@ch.ndhm', 'tech diagnostic services 13'),
                                                  (11123456789012, 'james', 'garcia', 'radiologist', 'radiology', 1112345678, 'james.garcia@example.com', 'md', 13, 'research', 'greenvalleycenter@ch.ndhm', 'green valley medical center'),
                                                  (12123456789012, 'mary', 'wilson', 'doctor', 'allopathic', 1212345678, 'mary.wilson@example.com', 'md', 7, 'teaching', 'metrocare003@ch.ndhm', 'metro care hospital 3'),
                                                  (13123456789012, 'robert', 'lopez', 'doctor', 'allopathic', 1312345678, 'robert.lopez@example.com', 'md', 19, 'research', 'hospitalpuduchery@ch.ndhm', 'city general hospital'),
                                                  (14123456789012, 'jessica', 'perez', 'doctor', 'allopathic', 1412345678, 'jessica.perez@example.com', 'md', 17, 'teaching', 'highlandcenter@ch.ndhm', 'highland medical center'),
                                                  (15123456789012, 'john', 'miller', 'radiologist', 'radiology', 1512345678, 'john.miller@example.com', 'md', 10, 'research', 'coastalcenter@ch.ndhm', 'coastal medical center');



INSERT INTO `user` (`id`,`email`, `first_name`, `last_name`, `contact`, `login_id`, `password`, `type`,`is_active`) VALUES
                                                                                                                        (1,'Sachin.Nair@iiitb.ac.in', 'Sachin', 'Nair', '+918149734360', 'Sachin.Nair@iiitb.ac.in', '$2a$12$Yr.topTFWL.ESkM9gvEVve6L3geGc2YeO4hHjB3YYPuNunHOpQl8y', 'admin',1),
                                                                                                                        (2,'Anjali.Kumar@iiitb.ac.in', 'Anjali', 'Kumar', '+916282693806', 'Anjali.Kumar@iiitb.ac.in', '$2a$12$Yr.topTFWL.ESkM9gvEVve6L3geGc2YeO4hHjB3YYPuNunHOpQl8y', 'admin',1),
                                                                                                                        (3,'Srishti.Yadav@iiitb.ac.in', 'Srishti', 'Yadav', '+919917316461', 'Srishti.Yadav@iiitb.ac.in', '$2a$12$Yr.topTFWL.ESkM9gvEVve6L3geGc2YeO4hHjB3YYPuNunHOpQl8y', 'admin',1),
                                                                                                                        (4,'Sambhu.SS@iiitb.ac.in', 'Sambhu', 'SS', '+919562758206', 'Sambhu.SS@iiitb.ac.in', '$2a$12$Yr.topTFWL.ESkM9gvEVve6L3geGc2YeO4hHjB3YYPuNunHOpQl8y', 'admin',1);

INSERT INTO `user` (`id`,`email`, `first_name`, `last_name`, `contact`, `login_id`, `password`, `type`,`is_active`) VALUES
                                                                                                                        (5,'Aromal@gmail.com', 'Aromal', 'A', '+919876543210', 'Aromal@gmail.com', 'patient123', 'patient',1),
                                                                                                                        (6,'Sunny@gmail.com', 'Sunny', 'L', '+918765432109', 'Sunny@gmail.com', 'patient123', 'patient',1),
                                                                                                                        (7,'Prabhas@gmail.com', 'Prabhas', 'S', '+917654321098', 'Prabhas@gmail.com', 'patient123', 'patient',1);

INSERT INTO `user` (`id`,`email`, `first_name`, `last_name`, `contact`, `login_id`, `password`, `type`,`is_active`) VALUES
                                                                                                                        (8,'hospital1@gmail.com', 'hos1', null, '+919876543210', 'hospital1@gmail.com', 'hos1pass', 'hospital',1),
                                                                                                                        (9,'hospital2@gmail.com', 'hos2', null, '+918765432109', 'hospital2@gmail.com', 'hos2pass', 'hospital',1),
                                                                                                                        (10,'lab1@gmail.com', 'lab1', null, '+917654321098', 'lab1@gmail.com', 'lab1pass', 'lab',1),
                                                                                                                        (11,'lab2@gmail.com', 'lab2', null, '+917654321098', 'lab2@gmail.com', 'lab2pass', 'lab',1);

INSERT INTO `user` (`id`,`email`, `first_name`, `last_name`, `contact`, `login_id`, `password`, `type`,`is_active`) VALUES
                                                                                                                        (12,'rad1@gmail.com', 'rad1_fname', 'rad1_lname', '+919876543210', 'rad1@gmail.com', 'rad1pass', 'radiologist',1),
                                                                                                                        (13,'rad2@gmail.com', 'rad2_fname', 'rad2_lname', '+919876543210', 'rad2@gmail.com', 'rad2pass', 'radiologist',1),
                                                                                                                        (14,'doc1@gmail.com', 'doc1_fname', 'doc1_lname', '+917654321098', 'doc1@gmail.com', 'doc1pass', 'doctor',1),
                                                                                                                        (15,'doc2@gmail.com', 'doc2_fname', 'doc2_lname', '+917654321098', 'doc2@gmail.com', 'doc2pass', 'doctor',1),
                                                                                                                        (16,'rad3@gmail.com', 'rad3_fname', 'rad3_lname', '+919876543210', 'rad3@gmail.com', 'rad3pass', 'radiologist',1),
                                                                                                                        (17,'doc3@gmail.com', 'doc3_fname', 'doc3_lname', '+917654321098', 'doc3@gmail.com', 'doc3pass', 'doctor',1);

INSERT INTO `patient` (`id`,`dob`, `age`, `gender`, `address`, `blood_grp`, `guardian_first_name`, `guardian_last_name`, `guardian_contact`,user_id)
VALUES
    (1,'1990-05-15', 32, 'male', 'Flat No. 101, Sunshine Apartments, MG Road, Bengaluru, Karnataka, India', 'A+', 'Rajesh', 'Kumar', '+91 9876543210',5),
    (2,'1985-07-25', 36, 'male', 'House No. 123, Park Street, Kolkata, West Bengal, India', 'O-', 'Amit', 'Sharma', '+91 8765432109',6),
    (3,'1992-11-08', 29, 'female', 'Plot No. 45, Rose Avenue, Pune, Maharashtra, India', 'B+', 'Priya', 'Patel', '+91 7654321098',7);


INSERT INTO `facility` (`id`, `ufid`, `state`, `district`, `sub_district`, `country`, `type`,`user_id`)
VALUES
    (1, 'techdiagnostics013@ch.ndhm', 'statem', 'district13', 'subdistm', 'countryn', 'hospital',8),
    (2, 'metrocare003@ch.ndhm', 'statee', 'district5', 'subdiste', 'countryv', 'lab',10),
    (3, 'coastalcenter@ch.ndhm', 'statec', 'district3', 'subdistc', 'countryz', 'hospital', 9),
    (4, 'healthscan002@ch.ndhm', 'stated', 'district4', 'subdistd', 'countryw', 'lab', 11);

INSERT INTO professional (id, license_number, experience, affiliated_facility_id, specialization, user_id, system_of_medicine, qualification, status, place_of_work)
VALUES
    (1, '10123456789012', 16, 'techdiagnostics013@ch.ndhm', 'radiologist', 12, 'radiology', 'Dummy Qualification 1', 'Active', 'Hospital A'),
    (2, '12123456789012', 7, 'metrocare003@ch.ndhm', 'doctor', 14, 'allopathy', 'Dummy Qualification 2', 'Inactive', 'Clinic B'),
    (5, '15123456789012', 10, 'coastalcenter@ch.ndhm', 'radiologist', 17, 'radiology', 'MD', 'Active', 'Coastal Medical Center');


INSERT INTO `consultation` (`id`,`name`,`patient_id`, `date_created`, `prof_doc_id`, `status`, `final_report`, `test`, `fac_lab_id`)
VALUES
    (1,'consultancy1',1, '2024-04-05 10:00:00', 2, 'Completed', 'Patient has recovered well.', 'Take antibiotics for 7 days.', 2),
    (2,'consultancy2',2, '2024-04-05 11:00:00', 2, 'In Progress', 'Patient requires further tests.', 'Refer to a specialist.', 4),
    (3,'consultancy3',3, '2024-04-05 12:00:00', 2, 'Completed', 'Patient has recovered fully.', 'No test required.', 2),
    (4,'consultancy4',1, '2024-04-05 13:00:00', 2, 'In Progress', 'Further observation needed.', 'Prescribed painkillers.', 4),
    (5,'consultancy5',2, '2024-04-05 14:00:00', 2, 'Completed', 'Patient discharged.', 'Rest recommended.', 2);


INSERT INTO message (consultation_id, sender_id, receiver_id, message_content, created_at) VALUES (1, 1, 2, 'I need some clarification on the test results.', '2024-04-06 12:10:00');
INSERT INTO message (consultation_id, sender_id, receiver_id, message_content, created_at) VALUES (1, 2, 1, 'Sure, could you please specify?', '2024-04-06 12:15:00');
INSERT INTO message (consultation_id, sender_id, receiver_id, message_content, created_at) VALUES (1, 1, 2, 'I'm concerned about the anomaly in the MRI scan.', '2024-04-06 12:20:00');
INSERT INTO message (consultation_id, sender_id, receiver_id, message_content, created_at) VALUES (1, 2, 1, 'Let me review the scan again and get back to you.', '2024-04-06 12:25:00');
INSERT INTO message (consultation_id, sender_id, receiver_id, message_content, created_at) VALUES (1, 1, 2, 'Thank you, I'll wait for your response.', '2024-04-06 12:30:00');
