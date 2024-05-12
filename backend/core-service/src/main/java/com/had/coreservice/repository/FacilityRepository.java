package com.had.coreservice.repository;

import com.had.coreservice.entity.Facility;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FacilityRepository extends JpaRepository<Facility, Long> {
    List<Facility> findAllByTypeIgnoreCase(String type);
    Optional<Facility> findByIdAndTypeIgnoreCase(Long id, String type);

    @Query("SELECT c.consultationId, c.name, c.dateCreated, c.status " +
            "FROM Consultation c " +
            "JOIN c.labFacility f " +
            "JOIN f.user u " +
            "WHERE u.type = 'lab' AND f.id = :facilityId " +
            "ORDER BY c.dateCreated DESC")
    List<Object[]> findConsultationDetailsForLab(@Param("facilityId") Long facilityId);

    @Query("SELECT u.firstName FROM User u JOIN Facility f ON f.user.id = u.id WHERE f.id = :facilityId AND LOWER(u.type) = LOWER(:entityType)")
    Optional<String> findFacNameById(@Param("facilityId") Long facilityId, @Param("entityType") String entityType);
}
