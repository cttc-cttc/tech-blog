package com.blog.tech.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "image_url_entity")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ImageUrlEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 실제 이미지 URL (ex: /uploads/images/abc123.jpg)
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB NOT NULL")
    private String url;

    // 어느 글에서 사용되는 이미지인지 (nullable 가능)
    private Long postId;

    // 사용 여부 플래그 (true면 게시글에서 사용 중)
    private boolean used;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
