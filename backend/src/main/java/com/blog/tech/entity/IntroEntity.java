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

    @Id
    private Integer id; // 고정 PK

    @Column(length = 100, nullable = false)
    private String title;

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
