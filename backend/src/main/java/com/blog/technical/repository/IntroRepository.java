package com.blog.technical.repository;

import com.blog.technical.entity.IntroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IntroRepository extends JpaRepository<IntroEntity, Integer> {
}
