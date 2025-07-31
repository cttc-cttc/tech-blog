package com.blog.technical.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class IntroEntity {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int post_id;

    // 업데이트 용 pk를 스트링으로 받는 용도
    private String post_id_str;

    @Column(length = 20, nullable = false)
    private String writer;

    @Column(length = 100, nullable = false)
    private String title;

    @Column(length = 4000, nullable = false)
    private String contents;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime updatedAt;

    private int del_flag;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
