package com.blog.tech.repository;

import com.blog.tech.entity.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Long> {

    // 해당 하위 카테고리에서 검색 결과를 반환
    @Query("""
            SELECT p FROM PostEntity p
            WHERE p.category.urlName = :category2
            AND p.title LIKE CONCAT('%', :keyword, '%')
            AND p.delFlag = false
            """)
    Page<PostEntity> findByCategoryWithKeyword(
            @Param("category2") String category2,
            @Param("keyword") String keyword,
            Pageable pageable
    );

    // 해당 상위 카테고리에 속하는 하위 카테고리들에서 검색 결과를 반환
    @Query("""
            SELECT p FROM PostEntity p
            WHERE p.category.parent.urlName = :category1
            AND p.title LIKE CONCAT('%', :keyword, '%')
            AND p.delFlag = false
            """)
    Page<PostEntity> findByParentCategoryWithKeyword(
            @Param("category1") String category1,
            @Param("keyword") String keyword,
            Pageable pageable
    );

    // 카테고리 id에 해당하는 페이지 처리된 모든 글 리스트 반환 (상위, 하위 둘다 가능)
    @Query("""
            SELECT p
            FROM PostEntity p
            WHERE p.category.id IN :categoryIds
            AND p.delFlag = false
            """)
    Page<PostEntity> findPageByCategoryIds(
            @Param("categoryIds") List<Long> categoryIds,
            Pageable pageable
    );

    // 카테고리 상관 없이 페이지 처리된 모든 글 리스트 반환
    @Query("""
           SELECT p
           FROM PostEntity p
           WHERE p.delFlag = false
           """)
    Page<PostEntity> findPageAllActive(Pageable pageable);

    // 제목에 keyword 포함된 게시글 검색 (페이지 적용)
    Page<PostEntity> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);
}
