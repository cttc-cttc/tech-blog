package com.blog.technical.repository;

import com.blog.technical.entity.IntroEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface IntroRepository extends JpaRepository<IntroEntity, Integer> {

    // 직접 작성한 sql로 가장 최근의 post_id 값 가져오기 (intro 글은 하나만 쓰고 계속 수정하면 되기 때문)
    @Query(value = "SELECT post_id FROM intro_entity ORDER BY post_id DESC LIMIT 1", nativeQuery = true)
    Integer findMostRecentId();
}
