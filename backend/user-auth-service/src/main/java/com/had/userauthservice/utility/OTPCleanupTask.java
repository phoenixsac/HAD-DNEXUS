package com.had.userauthservice.utility;

import com.had.userauthservice.entities.OTPValidation;
import com.had.userauthservice.repository.OTPRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class OTPCleanupTask {

    private static final Logger logger = LoggerFactory.getLogger(OTPCleanupTask.class);

    @Autowired
    private OTPRepository otpRepository;

    @Scheduled(fixedDelay = 2 * 60 * 1000) // Run once a day
    public void cleanupExpiredOTPRecords() {
        // Delete expired OTP records from the database
        otpRepository.deleteExpiredRecords();
    }
}
