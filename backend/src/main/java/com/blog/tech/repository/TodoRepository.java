package com.blog.tech.repository;

import com.blog.tech.entity.TodoEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TodoRepository extends JpaRepository<TodoEntity, Long> {

    @Query("""
            SELECT t
            FROM TodoEntity t
            """)
    Page<TodoEntity> findAllPage(Pageable pageable);
}
