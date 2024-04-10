package com.had.coreservice.repository;


import com.had.coreservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query("SELECT CONCAT(u.firstName, ' ', u.lastName) FROM User u WHERE u.id = :userId")
    String findFullNameById(Long userId);
}
