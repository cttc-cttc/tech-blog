package com.blog.tech.repository;

import com.blog.tech.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    List<CategoryEntity> findByParentIsNull();

    List<CategoryEntity> findAllByParentId(Long parentId);

    // slug와 parent로 찾기
    Optional<CategoryEntity> findByUrlNameAndParentIsNull(String urlName);
    Optional<CategoryEntity> findByUrlNameAndParent(String urlName, CategoryEntity parent);
}
