package com.blog.tech.service;

import com.blog.tech.dto.PostRequestDto;
import com.blog.tech.dto.PostResponseDto;
import com.blog.tech.entity.CategoryEntity;
import com.blog.tech.entity.PostEntity;
import com.blog.tech.repository.CategoryRepository;
import com.blog.tech.repository.ImageUrlRepository;
import com.blog.tech.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
//@Transactional(readOnly = true)
public class PostService {

    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;
    private final ImageUrlRepository imageUrlRepository;

    /**
     * 전체 글 조회 (페이지 적용)
     * @param pageable
     * @return
     */
    public Page<PostResponseDto> getPagePostsAll(Pageable pageable) {
        return postRepository.findPageAllActive(pageable)
                .map(PostResponseDto::fromEntity);
    }

    /**
     * 특정 카테고리 글 조회 (페이지 적용)
     * 상위, 하위 카테고리에 따른 해당하는 글 전체 리스트
     * @param categoryId
     * @param pageable
     * @return
     */
    public Page<PostResponseDto> getPagePostsByCategoryId(Long categoryId, Pageable pageable) {
        // 선택한 카테고리
        CategoryEntity category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found"));

        List<Long> categoryIds;

        if (category.getParent() == null) {
            // 상위 카테고리 -> 자기 자신 + 하위 카테고리 IDs 전부
            categoryIds = categoryRepository.findAllByParentId(categoryId)
                    .stream()
                    .map(CategoryEntity::getId)
                    .collect(Collectors.toList());
            categoryIds.add(categoryId); // 자기 자신도 포함
        } else {
            // 하위 카테고리 -> 자기 자신만
            categoryIds = List.of(categoryId);
        }

        return postRepository.findPageByCategoryIds(categoryIds, pageable)
                .map(PostResponseDto::fromEntity);
    }

    /**
     * 글의 id값으로 해당 글 하나 조회
     * Entity를 그대로 반환하지 않고 Dto로 변환해서 반환
     * @param id
     * @return
     */
    public Optional<PostResponseDto> getPostById(Long id) {
        return postRepository.findById(id) // jpa 기본 Optional 반환 함수
                .map(PostResponseDto::fromEntity); // Optional<PostEntity> -> Optional<PostResponseDto>
    }

    /**
     * 카테고리에 맞는 글 등록
     * @param request
     * @return
     */
    public PostResponseDto createPost(PostRequestDto request) {
        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("카테고리 없음"));

        PostEntity post = new PostEntity();
        post.setTitle(request.getTitle());
        post.setContents(request.getContents());
        post.setWriter(request.getWriter());
        post.setCategory(category);

        PostEntity saved = postRepository.save(post);
        List<String> images = request.getImages();
        if (!images.isEmpty()) {
            imageUrlRepository.markImagesAsUsed(images);
        }
        return PostResponseDto.fromEntity(saved);
    }

    /**
     * 글 수정
     * @param id 수정하려는 글의 id
     * @param request 수정하려는 글의 내용
     * @return
     */
    public PostResponseDto updatePost(Long id, PostRequestDto request) {
        PostEntity post = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("id에 해당하는 포스트 없음"));


        CategoryEntity category = categoryRepository.findById((request.getCategoryId()))
                .orElseThrow(() -> new IllegalArgumentException("categoryId에 해당하는 카테고리 없음"));

        Optional.ofNullable(post).map(postEntity -> {
                postEntity.setTitle(request.getTitle());
                postEntity.setCategory(category);
                postEntity.setContents(request.getContents());
                return postRepository.save(postEntity);
        })
        .orElseThrow(() -> new RuntimeException("Post not found with id" + id));

        return PostResponseDto.fromEntity(post);
    }

    /**
     * 글 삭제 (soft delete)
     * @param id 삭제하려는 글의 id
     */
    @Transactional
    public void deletePost(Long id) {
        PostEntity postEntity = postRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("글 없음"));
        postEntity.setDelFlag(true);
    }

    /**
     * 검색어가 제목에 포함되는 모든 카테고리의 게시글 조회
     * @param keyword
     * @return
     */
    public Page<PostResponseDto> getPagePostsByKeyword(String keyword, Pageable pageable) {
        return postRepository.findByTitleContainingIgnoreCase(keyword, pageable)
                .map(PostResponseDto::fromEntity);
    }

    /**
     * 해당 하위 카테고리에서 검색 결과를 반환 또는
     * 해당 상위 카테고리에 속하는 하위 카테고리들에서 검색 결과를 반환
     * @param category1
     * @param category2
     * @param keyword
     * @return
     */
    public Page<PostResponseDto> getPostsByKeywordInBoard(String category1, String category2, String keyword, Pageable pageable) {
        if(category2 != null) {
            // 해당 하위 카테고리에서 검색 결과를 반환
            return postRepository.findByCategoryWithKeyword(category2, keyword, pageable)
                    .map(PostResponseDto::fromEntity);
        }

        // 해당 상위 카테고리에 속하는 하위 카테고리들에서 검색 결과를 반환
        return postRepository.findByParentCategoryWithKeyword(category1, keyword, pageable)
                .map(PostResponseDto::fromEntity);
    }
}
