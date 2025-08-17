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

    /**
     * 카테고리 상관 없이 모든 게시글 목록 조회
     * 는 상위, 하위 카테고리에 따른 글 목록 조회
     * @param category1
     * @param category2
     * @return
     */
    @GetMapping("/posts")
    public ResponseEntity<List<PostResponseDto>> getPosts(
            @RequestParam(required = false) String category1,
            @RequestParam(required = false) String category2
    ) {
        // category1이 있으면 상위/하위 카테고리 조회
        if(category1 != null) {
            CategoryEntity category = categoryService.findByPath(category1, category2);
            return ResponseEntity.ok(postService.getPostsByCategory(category.getId()));
        }

        // category1이 없으면 전체 글 조회
        return ResponseEntity.ok(postService.getPostsAll());
    }

    /**
     * 글 내용 조회
     * @param id 글의 id
     * @return
     */
    @GetMapping("/posts/{id}")
    public ResponseEntity<PostResponseDto> getPost(@PathVariable Long id) {
        // 값이 있으면 → ResponseEntity.ok(값) 반환
        // 값이 없으면 → 404 Not Found 반환
        return postService.getPostById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * 글 등록
     * @param request
     * @return
     */
    @PostMapping("/posts")
    public ResponseEntity<PostResponseDto> createPost(@RequestBody PostRequestDto request) {
        return ResponseEntity.ok(postService.createPost(request));
    }

    /**
     * 글 수정
     * @param id 수정하려는 글의 id
     * @param request 수정하려는 글의 내용
     * @return
     */
    @PutMapping("/posts/{id}")
    public ResponseEntity<PostResponseDto> updatePost(@PathVariable Long id, @RequestBody PostRequestDto request) {
        return ResponseEntity.ok(postService.updatePost(id, request));
    }

    /**
     * 글 삭제 (del_flag를 false에서 true로 전환하는 soft delete)
     * @param id 삭제하려는 글의 id
     * @return
     */
    @PatchMapping("/posts/{id}")
    public ResponseEntity<Void> softDelete(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    // ------------------------------------------------------------------------------------

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
