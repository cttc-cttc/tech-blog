package com.blog.tech.repository;

import com.blog.tech.entity.CommentEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

//    @Query("""
//            SELECT c FROM CommentEntity c LEFT JOIN FETCH c.children ch
//            WHERE c.postId = :postId AND c.parent IS NULL AND c.delFlag = false
//            AND (ch IS NULL OR ch.delFlag = false)
//            ORDER BY c.id ASC
//            """)
    @Query("""
            SELECT c FROM CommentEntity c LEFT JOIN FETCH c.children
            WHERE c.post.id = :postId AND c.parent IS NULL AND c.delFlag = false
            ORDER BY c.id ASC
            """)
    List<CommentEntity> findCommentsWithChildren(@Param("postId") Long postId);

    @Query("""
        SELECT c
        FROM CommentEntity c
        LEFT JOIN FETCH c.children
        JOIN FETCH c.post p
        JOIN FETCH p.category cat
        WHERE c.userId = :userId AND c.delFlag = false
        ORDER BY c.id DESC
    """)
    Page<CommentEntity> findCommentsWithChildrenAndPostAndCategoryPage(@Param("userId") String userId, Pageable pageable);
}
