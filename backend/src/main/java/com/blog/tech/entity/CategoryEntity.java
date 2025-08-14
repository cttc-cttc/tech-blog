package com.blog.tech.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "category")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CategoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 카테고리 웹 표시명
    @Column(nullable = false, length = 20)
    private String name;

    // 카테고리 url명
    @Column(nullable = false, length = 20)
    private String urlName;

    // 자기 자신을 참조하는 필드
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private CategoryEntity parent;

    // 자식 카테고리들
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private List<CategoryEntity> children = new ArrayList<>();

    @Column(nullable = false)
    private int depth = 0;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;
}

