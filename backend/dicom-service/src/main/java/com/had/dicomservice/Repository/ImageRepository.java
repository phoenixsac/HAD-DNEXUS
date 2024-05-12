package com.had.dicomservice.Repository;

import com.had.dicomservice.Entity.ImageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Long> {
    // Add custom query methods if needed
}
