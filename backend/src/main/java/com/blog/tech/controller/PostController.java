package com.blog.tech.controller;

import com.blog.tech.dto.CategoryDto;
import com.blog.tech.dto.CategoryTreeResponseDto;
import com.blog.tech.dto.PostRequestDto;
import com.blog.tech.dto.PostResponseDto;
import com.blog.tech.entity.CategoryEntity;
import com.blog.tech.repository.CategoryRepository;
import com.blog.tech.service.CategoryService;
import com.blog.tech.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;
    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;

    // 글 등록
    @PostMapping("/posts")
    public ResponseEntity<?> createPost(@RequestBody PostRequestDto request) {
        postService.createPost(request);
        return ResponseEntity.ok().build();
    }

    // 글 목록 조회
    @GetMapping("/posts")
    public ResponseEntity<List<PostResponseDto>> getPosts(@RequestParam(required = false) Long categoryId) {
        return ResponseEntity.ok(postService.getPosts(categoryId));
    }

    // 카테고리 등록
    @PostMapping("/category-insert")
    public ResponseEntity<?> insertCategory(CategoryDto request) {
        categoryService.insertCategory(request);
        return ResponseEntity.ok().build();
    }

    // 카테고리 트리 조회
    @GetMapping("/categories/tree")
    public ResponseEntity<List<CategoryTreeResponseDto>> getCategoryTree() {
        List<CategoryEntity> rootCategories = categoryRepository.findByParentIsNull();
        List<CategoryTreeResponseDto> result = rootCategories.stream()
                .map(CategoryTreeResponseDto::new)
                .collect(Collectors.toList());

        return ResponseEntity.ok(result);
    }

}
