package com.had.coreservice.service;

import com.had.coreservice.entity.Doctor;
import com.had.coreservice.repository.DoctorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository doctorRepository;

    public Doctor findByEmail(String email) {
        return doctorRepository.findByEmail(email);
    }

    public List<Doctor> findAllDoctors() {
        return doctorRepository.findAll();
    }


}

