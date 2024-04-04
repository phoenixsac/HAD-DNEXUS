package com.had.patientservice.repository;

import com.had.patientservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
@Component
public interface UserRepository extends JpaRepository<User, Long> {

    @Query(value = "SELECT * FROM user WHERE id = :id", nativeQuery = true)
    User findByUserId(Long id);

    @Query(value = "SELECT * FROM user WHERE email= :email",nativeQuery = true)
    User findByEmail(String email);
}
