package com.had.adminservice.repository;

import com.had.adminservice.entity.Doctor;
import com.had.adminservice.entity.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface HospitalRepository extends JpaRepository<Hospital, String> {

    @Query(value = "SELECT * FROM hospital WHERE ufid = :ufid", nativeQuery = true)
    Hospital findHospitalByUfid(String ufid);

}
