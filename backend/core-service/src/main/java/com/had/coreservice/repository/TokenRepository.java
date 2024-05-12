package com.had.coreservice.repository;

import com.had.coreservice.entity.Consent;
import com.had.coreservice.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {

    @Query("SELECT t FROM Token t WHERE t.consentId = :consentId")
    Optional<Token> getTokenByConsentId(@Param("consentId") Long consentId);

}
