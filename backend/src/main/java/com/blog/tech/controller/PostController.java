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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
     * 또는 상위, 하위 카테고리에 따른 글 목록 조회
     * @param category1
     * @param category2
     * @return
     */
    @GetMapping("/posts")
    public ResponseEntity<List<PostResponseDto>> getPosts(
            @RequestParam(required = false) String category1,
            @RequestParam(required = false) String category2
    ) {
        // category1이 있으면 상위 혹은 상하위 카테고리 조회
        if(category1 != null) {
            CategoryEntity category = categoryService.findByPath(category1, category2);
            return ResponseEntity.ok(postService.getPostsByCategoryId(category.getId()));
        }

        // category1이 없으면 전체 글 조회 (메인 홈 화면에서 요청 보낼 때)
        return ResponseEntity.ok(postService.getPostsAll());
    }

    /**
     * [홈 화면 필터링 포함]
     * 페이지 처리 된 게시글 리스트
     * 카테고리 상관 없이 모든 게시글 페이지 목록 조회
     * 또는 상위, 하위 카테고리에 따른 페이지 글 목록 조회
     * @param category1
     * @param category2
     * @param page
     * @param size
     * @return
     */
    @GetMapping("/posts/page")
    public ResponseEntity<Page<PostResponseDto>> getPaginationPosts(
            @RequestParam(required = false) String category1,
            @RequestParam(required = false) String category2,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        // category1이 있으면 상위 혹은 상하위 카테고리 조회 (게시판)
        if(category1 != null) {
            CategoryEntity category = categoryService.findByPath(category1, category2);
            Page<PostResponseDto> posts = postService.getPagePostsByCategoryId(category.getId(), pageable);
            return ResponseEntity.ok(posts);
        }

        // category1이 없으면 전체 글 조회 (홈 화면)
        Page<PostResponseDto> posts = postService.getPagePostsAll(pageable);
        return ResponseEntity.ok(posts);
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

    /**
     * [ 필터링 ]
     * 부모 카테고리 이름으로 리스트 조회 (it / jp)
     * 프론트 영역에서 all을 선택했을 postService.getPostsAll() 실행
     * @param category
     * @return
     */
//    @GetMapping("/posts/filter")
//    public ResponseEntity<Page<PostResponseDto>> getPostsFilter(@RequestParam(required = false) String category) {
//        if(category != null) {
//            return getPaginationPosts(category,null,0,10);
//        }
//
//        return getPaginationPosts(null,null,0,10);
//    }

    /**
     * [ 홈 검색 ]
     * 홈 화면에서 키보드 이벤트로 입력한 keyword로 리스트 조회
     * keyword는 글 제목에서 검색
     * 공백을 입력했다면 postService.getPostsAll() 실행
     * @param keyword
     * @return
     */
    @GetMapping("/posts/keyword")
    public ResponseEntity<Page<PostResponseDto>> getPostsKeyword(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("id").descending());

        if (keyword.isBlank()) {
            return ResponseEntity.ok(postService.getPagePostsAll(pageable));
        }

        return ResponseEntity.ok(postService.getPagePostsByKeyword(keyword, pageable));
    }

    /**
     * [ 게시판 검색 ]
     * 게시글 목록 페이지에서 검색을 하면 해당 카테고리에 맞는 글 리스트 반환
     * 검색어 없이 Enter key 입력을 하면 현재 카테고리에 맞게 위에서 선언한 getPosts(category1, category2)를 실행
     * @param category1
     * @param category2 없을 수도 있음 (null)
     * @param keyword
     * @return
     */
    @GetMapping("/posts/board/keyword")
    public ResponseEntity<List<PostResponseDto>> getPostsBoardKeyword(
            @RequestParam String category1,
            @RequestParam(required = false) String category2,
            @RequestParam String keyword
    ) {
        if(keyword.isBlank()) {
            return getPosts(category1, category2);
        }

        return ResponseEntity.ok(postService.getPostsByKeywordInBoard(category1, category2, keyword));
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
