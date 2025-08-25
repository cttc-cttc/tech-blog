package com.blog.tech.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    private Long postId; // 어느 글에 달린 댓글인지

    private String userId; // 작성자 ID (User 테이블이 있으면 ManyToOne으로 매핑 가능)
    private String nickName;

    @Column(nullable = false, length = 1000)
    private String content;

    @Column(name = "del_flag", nullable = false)
    @Builder.Default
    private boolean delFlag = false; // 기본값 false

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private PostEntity post;

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

    // 부모 댓글 (null이면 최상위 댓글)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private CommentEntity parent;

    // 답글 리스트
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, orphanRemoval = true)
    @SQLRestriction("del_flag = false")
    @Builder.Default
    private List<CommentEntity> children = new ArrayList<>();
}