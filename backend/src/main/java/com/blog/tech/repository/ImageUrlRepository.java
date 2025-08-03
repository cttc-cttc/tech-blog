package com.blog.tech.repository;

import com.blog.tech.entity.ImageUrlEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImageUrlRepository extends JpaRepository<ImageUrlEntity, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE ImageUrlEntity i SET i.used = true WHERE i.url IN :urls")
    Integer markImagesAsUsed(@Param("urls") List<String> urls);
}
