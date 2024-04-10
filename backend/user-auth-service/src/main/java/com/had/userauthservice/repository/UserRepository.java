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
}
