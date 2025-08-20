package com.blog.tech.repository;

import com.blog.tech.entity.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<PostEntity, Long> {
    // 삭제되지 않은 모든 게시글 최근 순으로 조회
    @Query("SELECT p FROM PostEntity p WHERE p.delFlag = false ORDER BY p.id DESC")
    List<PostEntity> findAllActivePosts();

    // 카테고리 id에 해당하는 모든 글 리스트 반환 (상위, 하위 둘다 가능) (삭제되지 않은 최신 글 순서)
    @Query("SELECT p FROM PostEntity p WHERE p.category.id IN :categoryIds AND p.delFlag = false ORDER BY p.id DESC")
    List<PostEntity> findAllByCategoryIds(@Param("categoryIds") List<Long> categoryIds);

    // 부모 카테고리 이름에 해당하는 모든 글 리스트 반환 (it / jp)
    @Query("SELECT p FROM PostEntity p WHERE p.category.parent.urlName = :parentUrlName AND p.delFlag = false ORDER BY p.id DESC")
    List<PostEntity> findByParentCategoryName(@Param("parentUrlName") String parentUrlName);

    // 제목으로 검색한 모든 글 리스트 반환 (카테고리 무관)
    @Query("SELECT p FROM PostEntity p WHERE p.title LIKE CONCAT('%', :keyword, '%') AND p.delFlag = false ORDER BY p.id DESC")
    List<PostEntity> findByKeywordFromTitle(@Param("keyword") String keyword);

    // 해당 하위 카테고리에서 검색 결과를 반환
    @Query("SELECT p FROM PostEntity p " +
            "WHERE p.category.urlName = :category2 " +
            "AND p.title LIKE CONCAT('%', :keyword, '%') " +
            "AND p.delFlag = false " +
            "ORDER BY p.id DESC")
    List<PostEntity> findByCategoryWithKeyword(
            @Param("category2") String category2,
            @Param("keyword") String keyword
    );

    // 해당 상위 카테고리에 속하는 하위 카테고리들에서 검색 결과를 반환
    @Query("SELECT p FROM PostEntity p " +
            "WHERE p.category.parent.urlName = :category1 " +
            "AND p.title LIKE CONCAT('%', :keyword, '%') " +
            "AND p.delFlag = false " +
            "ORDER BY p.id DESC")
    List<PostEntity> findByParentCategoryWithKeyword(
            @Param("category1") String category1,
            @Param("keyword") String keyword
    );
}
