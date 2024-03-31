package com.had.coreservice.service;

import com.had.coreservice.entity.Lab;
import com.had.coreservice.repository.LabRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.Optional;


@Service
public class LabService {

    @Autowired
    private LabRepository labRepository;


    @Transactional
    public Lab saveLab(Lab lab) {
        return labRepository.save(lab);
    }

    @Transactional
    public Lab findByLabId(Long id) {
        Optional<Lab> labOptional = labRepository.findById(id);
        return labOptional.orElse(null);
    }

    // You can add more methods for additional business logic
}

