package com.had.adminservice.service;

import com.had.adminservice.entity.Doctor;
import com.had.adminservice.entity.HealthcareFacilityRegistry;
import com.had.adminservice.entity.HealthcareProfessionalsRegistry;
import com.had.adminservice.entity.Hospital;
import com.had.adminservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepo;

    @Autowired
    HFRRepository hfrRepo;

    @Autowired
    HPRRepository hprRepo;

    @Autowired
    HospitalRepository hospitalRepo;

    @Autowired
    DoctorRepository doctorRepo;

    public String addHospital(String ufid){
        HealthcareFacilityRegistry hfr;
        Hospital hospital;

            if (ufid == null || ufid.isEmpty()) {
                throw new IllegalArgumentException("UFID cannot be empty");
            }
            else if (hospitalRepo.findHospitalByUfid(ufid) != null) {
                return "Hospital with the provided UFID already exists!";
            }
            else{
                hfr=validateFromHFR(ufid);
                if(hfr==null)
                    return "Given hospital does not exist in Health Facility Registry!";
                else {
                    hospital=Hospital.builder().ufid(hfr.getFacilityId())
                            .name(hfr.getFacilityName())
                            .country(hfr.getCountry())
                            .district(hfr.getDistrict())
                            .subDistrict(hfr.getSubDistrict())
                            .contact(hfr.getContactNumber())
                            .state(hfr.getStateOrUt())
                            .build();
                    hospitalRepo.save(hospital);
                    return "Hospital added successfully";
                }
            }

    }


    private HealthcareFacilityRegistry validateFromHFR(String ufid){
        return hfrRepo.getByFacilityId(ufid);
    }


//    public String addDoctor(String upid){
//        HealthcareProfessionalsRegistry hpr;
//        Doctor doctor;
//
//        if (upid == null || upid.isEmpty()) {
//            throw new IllegalArgumentException("UFID cannot be empty");
//        }
//        else if(doctorRepo.findByUpid(upid) != null){
//                return "Added doctor already exists!";
//        }
//        else{
//            hpr=validateFromHPR(upid);
//            if(hpr==null)
//                return "Added hospital does not exist in Health Facility Registry!";
//            else {
//                doctor=Doctor.builder()
//                                .id(hpr.getHealthcareProfessionalId())
//                                        .contact(hpr.getContactNumber())
//                                                .name(hpr.getName())
//                                                        .experience(hpr.getYearsOfExperience())
//                                                                .licenseNumber(hpr.getHealthcareProfessionalId())
//                                                                        .specialization(hpr.getSpecialization())
//                                                                                .isActive(true)
//                                                                                        .build();
//                doctorRepo.save(doctor);
//            }
//        }
//        return "Hospital added successfully";
//    }

    public String addDoctor(String upid) {
        HealthcareProfessionalsRegistry hpr;
        Doctor doctor;

        if (upid == null || upid.isEmpty()) {
            throw new IllegalArgumentException("UPID cannot be empty");
        } else if (doctorRepo.findByUpid(upid) != null) {
            return "Doctor with the provided UPID already exists!";
        } else {
            hpr = validateFromHPR(upid);
            if (hpr == null)
                return "Hospital does not exist in Healthcare Professionals Registry!";
            else {
                doctor = Doctor.builder()
                        .id(hpr.getHealthcareProfessionalId())
                        .contact(hpr.getContactNumber())
                        .name(hpr.getName())
                        .experience(hpr.getYearsOfExperience())
                        .licenseNumber(hpr.getHealthcareProfessionalId())
                        .specialization(hpr.getSpecialization())
                        .isActive(true)
                        .build();
                doctorRepo.save(doctor);
            }
        }
        return "Doctor added successfully";
    }


    private HealthcareProfessionalsRegistry validateFromHPR(String ufid){
        return hprRepo.getByProfessionalId(ufid);
    }



    public ResponseEntity<String> removeHospital(String ufid) {
        Hospital hospital = hospitalRepo.findHospitalByUfid(ufid);
        if (hospital!=null) {
            hospitalRepo.delete(hospital);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<String> removeDoctor(String upid) {
        Doctor doctor = doctorRepo.findByUpid(upid);
        if (doctor!=null) {
            doctorRepo.delete(doctor);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
