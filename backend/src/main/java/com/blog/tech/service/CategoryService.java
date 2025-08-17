package com.blog.tech.service;

import com.blog.tech.dto.CategoryDto;
import com.blog.tech.entity.CategoryEntity;
import com.blog.tech.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public void insertCategory(CategoryDto request) {
        CategoryEntity category = new CategoryEntity();
        category.setName(request.getName());

        if (request.getParentId() != null) {
            CategoryEntity parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new IllegalArgumentException("부모 카테고리가 존재하지 않습니다."));
            category.setParent(parent);
            category.setDepth(parent.getDepth() + 1); // depth 자동 설정
        } else {
            category.setParent(null);
            category.setDepth(0); // 최상위는 depth 0
        }

        categoryRepository.save(category);
    }

    public CategoryEntity findByPath(String category1, String category2) {
        // 최상위 카테고리 찾기
        CategoryEntity parent = categoryRepository.findByUrlNameAndParentIsNull(category1)
                .orElseThrow(() -> new RuntimeException("카테고리 없음: " + category1));

        // 하위 카테고리 찾기 (2단계 구조일 때)
        if(category2 != null) {
            return categoryRepository.findByUrlNameAndParent(category2, parent)
                    .orElseThrow(() -> new RuntimeException("카테고리 없음: " + category1 + "/" + category2));
        }
        return parent;
    }
}
