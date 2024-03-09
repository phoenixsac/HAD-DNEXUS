package com.had.userauthservice.repository;


import com.had.userauthservice.entities.OTPValidation;
import com.had.userauthservice.entities.Patient;
import com.had.userauthservice.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OTPRepository extends JpaRepository<OTPValidation, Long> {

    @Query("SELECT otp FROM OTPValidation otp WHERE otp.email = ?1 ORDER BY otp.id DESC LIMIT 1")
    Optional<OTPValidation> findLatestByEmail(String email);

//    @Query(value = "SELECT * FROM otp_validation WHERE email = :email order by id desc", nativeQuery = true)
//    OTPValidation findLatestByEmail(@Param("email") String email);

    //List<OTPValidation> findByExpirationTimeBefore(LocalDateTime currentTime);

    @Transactional
    @Modifying
    @Query(value = "DELETE FROM otp_validation WHERE expiration_time <= CURRENT_TIMESTAMP;", nativeQuery = true)
    void deleteExpiredRecords();
}