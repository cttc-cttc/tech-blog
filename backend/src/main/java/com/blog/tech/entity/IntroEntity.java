package com.blog.tech.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "intro")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IntroEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    // 업데이트 용 pk를 스트링으로 받는 용도
    private String post_id_str;

    @Column(length = 20, nullable = false)
    private String writer;

    @Column(length = 4000, nullable = false)
    private String contents;

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
