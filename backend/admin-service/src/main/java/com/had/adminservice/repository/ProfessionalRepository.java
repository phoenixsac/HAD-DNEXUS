//package com.had.adminservice.repository;
//
//import com.had.adminservice.entity.Doctor;
//import com.had.adminservice.entity.Professional;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//
//public interface ProfessionalRepository extends JpaRepository<Professional, Long> {
//
//    @Query(value = "SELECT * FROM doctor WHERE license_number = :upid", nativeQuery = true)
//    P findByUpid(Long upid);
//
//    @Query(value = "SELECT * FROM doctor WHERE id = :id", nativeQuery = true)
//    Doctor findByDocId(Long id);
//
////    @Transactional
////    @Modifying
////    @Query("UPDATE user u SET u.login_id = NULL, u.password = NULL WHERE u.email IN (SELECT d.email_id FROM doctor d WHERE d.id = :id)")
////    void updateDoctorCredentialsToNull(Long id);
//
//
//}
