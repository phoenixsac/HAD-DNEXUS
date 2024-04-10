package com.had.userauthservice.repository;

import com.had.userauthservice.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;


public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "SELECT * FROM user WHERE email = :email", nativeQuery = true)
    User findByEmail(@Param("email") String email);

    @Query(value = "SELECT * FROM user", nativeQuery = true)
    List<User> getAllUsers();

    @Query("SELECT p.id FROM Patient p JOIN p.user u WHERE u.email = :email AND u.type = 'patient'")
    Long getActorIdFromEmailAndTypePatient(@Param("email") String email);

    @Query("SELECT p.id FROM Professional p JOIN p.user u WHERE u.email = :email AND u.type = 'radiologist'")
    Long getActorIdFromEmailAndTypeProfRadiologist(@Param("email") String email);

    @Query("SELECT p.id FROM Professional p JOIN p.user u WHERE u.email = :email AND u.type = 'doctor'")
    Long getActorIdFromEmailAndTypeProffDoctor(@Param("email") String email);

    @Query("SELECT f.id FROM Facility f JOIN f.user u WHERE u.email = :email AND u.type = 'lab'")
    Long getActorIdFromEmailAndTypeFacLab(@Param("email") String email);

    @Query("SELECT f.id FROM Facility f JOIN f.user u WHERE u.email = :email AND u.type = 'hospital'")
    Long getActorIdFromEmailAndTypeFacHospital(@Param("email") String email);

    @Query("SELECT u.id FROM User u WHERE u.email = :email AND u.type = 'admin'")
    Long getActorIdFromEmailAndTypeAdmin(@Param("email") String email);


}

