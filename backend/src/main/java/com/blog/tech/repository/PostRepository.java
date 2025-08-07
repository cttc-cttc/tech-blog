package com.blog.tech.repository;

import com.blog.tech.entity.CategoryEntity;
import com.blog.tech.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Long> {

    List<PostEntity> findByCategoryId(Long categoryId);
}
