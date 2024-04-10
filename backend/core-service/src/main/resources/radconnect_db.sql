

DROP DATABASE IF EXISTS radconnect_db;
CREATE DATABASE IF NOT EXISTS radconnect_db;
USE radconnect_db;

DROP TABLE IF EXISTS
    healthcare_facility_registry,
    healthcare_professionals_registry,
    user,
    patient,
    hospital,
    doctor,
    admin;

###ddls###

##USER

create table healthcare_facility_registry (
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
                                                   name varchar(255),
                                                   specialization varchar(255),
                                                   system_of_medicine varchar(255),
                                                   contact_number bigint,
                                                   email_id varchar(255),
                                                   qualification varchar(255),
                                                   years_of_experience integer,
                                                   status varchar(255),
                                                   place_of_work varchar(255)
);


create table user(

                     email varchar(255) PRIMARY KEY,
                     name varchar(255) not null,
                     login_id varchar(255) not null,
                     password varchar(255) not null,
                     type varchar(255) not null
);



create table patient (
                         id BIGINT PRIMARY KEY AUTO_INCREMENT,
                         first_name VARCHAR(255),
                         last_name VARCHAR(255),
                         dob DATE,
                         age INT,
                         gender VARCHAR(10),
                         contact VARCHAR(20),
                         email VARCHAR(50),
                         address VARCHAR(255),
                         blood_grp VARCHAR(10),
                         guardian_first_name VARCHAR(255),
                         guardian_last_name VARCHAR(255),
                         guardian_contact VARCHAR(20)
);

create table hospital (
                          id bigint primary key auto_increment,
                          ufid varchar(255),
                          name varchar(255),
                          state varchar(255),
                          contact varchar(20),
                          sub_district varchar(255),
                          district varchar(255),
                          country varchar(255)
);


create table doctor (
                        id bigint primary key auto_increment,
                        name varchar(255),
                        contact varchar(30),
                        email varchar(255),
                        license_number varchar(50),
                        experience integer,
                        affiliated_hosp_id bigint,
                        specialization varchar(255),
                        isactive boolean default true,
                        foreign key (affiliated_hosp_id) references hospital(id)
);

create table thread (
                        id bigint primary key auto_increment,
                        name varchar(255),
                        date_created DATETIME,
                        patient_id BIGINT,
                        doc_email varchar(255),
                        status varchar(255),
                        lab_id BIGINT,
                        conclusion varchar(512),
                        prescription varchar(512),
                        foreign key (patient_id) references patient(id),
                        foreign key (doc_email) references doctor(email)

);

create table lab (
                    id bigint primary key auto_increment,
                    UFID varchar(255),
                    name varchar(255),
                    contact varchar(255),
                    sub_district varchar(255),
                    district varchar(255),
                    state varchar(255),
                    country varchar(255),
                    email varchar(255)

);


create table admin (
                       id bigint primary key,
                       first_name varchar(255),
                       last_name varchar(255),
                       contact varchar(20) unique,
                       email varchar(50) unique
);

###-------------------------------------------------------------------------ALTER STATEMENTS----------------------------------------------------------------------###
ALTER TABLE thread
    ADD CONSTRAINT fk_lab_id
        FOREIGN KEY (lab_id) REFERENCES lab(id);




###-------------------------------------------------------------------------INSERT-STATEMENTS----------------------------------------------------------------------###

insert into healthcare_facility_registry values
('hospitalpuduchery@ch.ndhm', 'city general hospital', 'allopathic', 'info@cityhospital.com', 'statea', 'subdista', 'private', 'hospital', '+91 1234567890', 'countryx', 'district1', 'urban'),
('rurallab001@ch.ndhm', 'rural diagnostics lab 1', 'radiology', 'info@rurallab1.com', 'stateb', 'subdistb', 'public', 'diagnostics lab', '+91 9876543210', 'countryy', 'district2', 'rural'),
('coastalcenter@ch.ndhm', 'coastal medical center', 'homeopathic', 'info@coastalcenter.com', 'statec', 'subdistc', 'private', 'hospital', '+91 5647382910', 'countryz', 'district3', 'urban'),
('healthscan002@ch.ndhm', 'health scan diagnostics 2', 'radiology', 'info@healthscan2.com', 'stated', 'subdistd', 'public', 'diagnostics lab', '+91 8765432109', 'countryw', 'district4', 'rural'),
('metrocare003@ch.ndhm', 'metro care hospital 3', 'allopathic', 'info@metrocare3.com', 'statee', 'subdiste', 'private', 'hospital', '+91 6543210987', 'countryv', 'district5', 'urban'),
('techdiagnostics004@ch.ndhm', 'tech diagnostic services 4', 'radiology', 'info@techdiagnostics4.com', 'statef', 'subdistf', 'public', 'diagnostics lab', '+91 2345678901', 'countryu', 'district6', 'rural'),
('highlandcenter@ch.ndhm', 'highland medical center', 'homeopathic', 'info@highlandcenter.com', 'stateg', 'subdistg', 'private', 'hospital', '+91 1098765432', 'countryt', 'district7', 'urban'),
('countrysidediagnostics006@ch.ndhm', 'countryside diagnostics 6', 'radiology', 'info@countrysidediagnostics6.com', 'stateh', 'subdisth', 'public', 'diagnostics lab', '+91 7654321098', 'countrys', 'district8', 'rural'),
('sunrisehospital007@ch.ndhm', 'sunrise hospital 7', 'allopathic', 'info@sunrisehospital7.com', 'statei', 'subdisti', 'private', 'hospital', '+91 8901234567', 'countryr', 'district9', 'urban'),
('greenvalleycenter@ch.ndhm', 'green valley medical center', 'radiology', 'info@greenvalleycenter.com', 'statej', 'subdistj', 'public', 'hospital', '+91 5432109876', 'countryq', 'district10', 'rural'),
('rurallab011@ch.ndhm', 'rural diagnostics lab 11', 'radiology', 'info@rurallab11.com', 'statek', 'subdistk', 'public', 'diagnostics lab', '+91 1122334455', 'countryp', 'district11', 'rural'),
('modernmedicalcenter@ch.ndhm', 'modern medical center', 'ayurvedic', 'info@modernmedicalcenter.com', 'statel', 'subdistl', 'private', 'hospital', '+91 9988776655', 'countryo', 'district12', 'urban'),
('techdiagnostics013@ch.ndhm', 'tech diagnostic services 13', 'radiology', 'info@techdiagnostics13.com', 'statem', 'subdistm', 'public', 'diagnostics lab', '+91 1212121212', 'countryn', 'district13', 'rural'),
('communityhospital014@ch.ndhm', 'community hospital 14', 'radiology', 'info@communityhospital14.com', 'stateo', 'subdisto', 'private', 'hospital', '+91 3434343434', 'countrym', 'district14', 'urban'),
('healthscan015@ch.ndhm', 'health scan diagnostics 15', 'radiology', 'info@healthscan15.com', 'statep', 'subdistp', 'public', 'diagnostics lab', '+91 5656565656', 'countryl', 'district15', 'rural');


###HEALTH-PROFESSIONAL-REGISTRY

insert into healthcare_professionals_registry values
(12345678901234, 'john doe', 'radiology', 'allopathic', 1234567890, 'john.doe@example.com', 'md', 10, 'teaching', 'city general hospital'),
(23456789012345, 'jane smith', 'radiology', 'allopathic', 2345678901, 'jane.smith@example.com', 'md', 15, 'research', 'tech diagnostic services 4'),
(34567890123456, 'david johnson', 'radiology', 'allopathic', 3456789012, 'david.johnson@example.com', 'md', 12, 'research', 'community hospital 14'),
(45678901234567, 'emily brown', 'radiology', 'allopathic', 4567890123, 'emily.brown@example.com', 'md', 8, 'teaching', 'rural diagnostics lab 1'),
(56789012345678, 'michael wilson', 'radiology', 'allopathic', 5678901234, 'michael.wilson@example.com', 'md', 20, 'research', 'health scan diagnostics 2'),
(67890123456789, 'sarah martinez', 'radiology', 'allopathic', 6789012345, 'sarah.martinez@example.com', 'md', 18, 'teaching', 'countryside diagnostics 6'),
(78901234567890, 'christopher taylor', 'radiology', 'allopathic', 7890123456, 'christopher.taylor@example.com', 'md', 14, 'research', 'sunrise hospital 7'),
(89012345678901, 'amanda anderson', 'radiology', 'allopathic', 8901234567, 'amanda.anderson@example.com', 'md', 11, 'teaching', 'health scan diagnostics 15'),
(90123456789012, 'daniel thomas', 'radiology', 'allopathic', 9012345678, 'daniel.thomas@example.com', 'md', 9, 'research', 'rural diagnostics lab 11'),
(10123456789012, 'jennifer rodriguez', 'radiology', 'allopathic', 1012345678, 'jennifer.rodriguez@example.com', 'md', 16, 'teaching', 'tech diagnostic services 13'),
(11123456789012, 'james garcia', 'radiology', 'allopathic', 1112345678, 'james.garcia@example.com', 'md', 13, 'research', 'green valley medical center'),
(12123456789012, 'mary wilson', 'radiology', 'allopathic', 1212345678, 'mary.wilson@example.com', 'md', 7, 'teaching', 'metro care hospital 3'),
(13123456789012, 'robert lopez', 'radiology', 'allopathic', 1312345678, 'robert.lopez@example.com', 'md', 19, 'research', 'city general hospital'),
(14123456789012, 'jessica perez', 'radiology', 'allopathic', 1412345678, 'jessica.perez@example.com', 'md', 17, 'teaching', 'highland medical center'),
(15123456789012, 'john miller', 'radiology', 'allopathic', 1512345678, 'john.miller@example.com', 'md', 10, 'research', 'coastal medical center');


INSERT INTO ADMIN (id, first_name, last_name, contact, email)
VALUES
    (1, 'Sachin', 'Nair', '+918149734360', 'Sachin.Nair@iiitb.ac.in'),
    (2, 'Anjali', 'Kumar', '+916282693806', 'Anjali.Kumar@iiitb.ac.in'),
    (3, 'Srishti', 'Yadav', '+919917316461', 'david.johnson@example.com'),
    (4, 'Sambhu', 'SS', '+919562758206', 'Sambhu.SS@iiitb.ac.in');



INSERT INTO user(name, email, login_id, password, type) VALUES
                                                            ('John Doe', 'john.doe@example.com','logId1', '$2a$10$u41n1.acIp8Ru.xcpr/SzOGGPtes6GrKgVtBSqOfD6qe4ttlcnwJy', 'rad'),
                                                            ('Jane Smith', 'jane.smith@example.com', 'logId2', '$2a$10$.zASGdry0kBzp8M53/S1jee240U5sAQ9X0riE.bx6WWbBzz.K4YP2', 'pat'),
                                                            ('Bob Johnson', 'bob.johnson@example.com', 'logId3', '$2a$10$aW/vTMYEyHOb8O15cfh6lO9W79qLGQ0LFNKEqyQwQKhtAmHZJBYyG', 'doc'),
                                                            ('Alice Williams', 'alice.williams@example.com','logId4', '$2a$10$g6XLj5nxqyez4CsjEAKeAucoqthdPpcs.G1b4wBkGd1hCQsaylHWu', 'rad'),
                                                            ('Charlie Brown', 'charlie.brown@example.com','logId5', '$2a$10$XjzpgdNtgmT6k5yiwJIVN.0XUYSr9ygaR.WMPRcj6w73PwJohwGoG', 'lab'),
                                                            ('sachin.nair@example.com', 'sachin.nair@example.com','logId6', '$2a$10$OTRLbGJkktRyWlFFDWSkBeKGj/nbBLF4ZDAUBrScbLOGstq4RJOdK', 'admin'),
                                                            ('Sachin Nair', 'sachinnair04630@gmail.com','SacLogId', '$2a$10$keZU7nwAFdM0vRF911SbJeMdzA56GU0KHCLavsLgDy8rola/RQ1Oa', 'admin'),
                                                            ('Anjali', 'Anjali.Kumar@iiitb.ac.in','AnjLogId', '$2a$10$FPZcEcIDrYkKlij9T9.cAu4qvqyzPOTlFTtNwka0tg8CfaV.7mWlG', 'admin'),
                                                            ('Srishti', 'david.johnson@example.com','SriLogId', '$2a$10$SqWFYdG98yNE2Bc3Ybvmd.2hT/77Kj5VooYr/LrkqkIpL/oP023yu', 'admin'),
                                                            ('Sambhu', 'Sambhu.SS@iiitb.ac.in','SamLogId', '$2a$10$/25RPghvuG5WaQ7onvsX1u0l7MD1UBpmD./71ik5XJOhqB7HKdGje', 'admin');




INSERT INTO hospital (ufid, name, state, contact, sub_district, district, country)
VALUES
    ('UF123', 'Hospital A', 'State1', '1234567890', 'Sub District A', 'District A', 'Country X'),
    ('UF456', 'Hospital B', 'State2', '0987654321', 'Sub District B', 'District B', 'Country Y'),
    ('UF789', 'Hospital C', 'State3', '1112223333', 'Sub District C', 'District C', 'Country Z');



INSERT INTO doctor (name, contact, email, license_number, experience, affiliated_hosp_id, specialization)
VALUES
    ('Dr. John Doe', '+1234567890', 'john.doe@example.com', 'LICENSE123', 10, 1, 'Cardiology'),
    ('Dr. Jane Smith', '+9876543210', 'jane.smith@example.com', 'LICENSE456', 8, 2, 'Pediatrics'),
    ('Dr. Michael Johnson', '+1112223333', 'michael.johnson@example.com', 'LICENSE789', 15, 3, 'Orthopedics');
