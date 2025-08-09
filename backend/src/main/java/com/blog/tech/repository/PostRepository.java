package com.blog.tech.repository;

import com.blog.tech.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Long> {

    // 카테고리 id에 해당하는 모든 글 리스트 반환 (상위, 하위 둘다 가능)
    @Query("SELECT p FROM PostEntity p WHERE p.category.id IN :categoryIds AND p.delFlag = false ORDER BY p.id DESC")
    List<PostEntity> findAllByCategoryIds(@Param("categoryIds") List<Long> categoryIds);
}
