package com.had.userauthservice.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "otp_validation")
public class OTPValidation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    private String email;

    @Column(name = "otp")
    private String otp;

    @Column(name = "expiration_time")
    private LocalDateTime expirationTime;

    public OTPValidation(String email, String otp, LocalDateTime expirationTime) {
        this.email=email;
        this.otp=otp;
        this.expirationTime=expirationTime;
    }
}
