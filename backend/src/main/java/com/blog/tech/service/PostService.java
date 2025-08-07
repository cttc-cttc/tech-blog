package com.blog.tech.service;

import com.blog.tech.dto.PostRequestDto;
import com.blog.tech.dto.PostResponseDto;
import com.blog.tech.entity.CategoryEntity;
import com.blog.tech.entity.PostEntity;
import com.blog.tech.repository.CategoryRepository;
import com.blog.tech.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {

    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;

    public void createPost(PostRequestDto request) {
        CategoryEntity category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("카테고리 없음"));

        PostEntity post = new PostEntity();
        post.setTitle(request.getTitle());
        post.setContents(request.getContents());
        post.setWriter(request.getWriter());
        post.setCategory(category);

        postRepository.save(post);
    }

    public List<PostResponseDto> getPosts(Long categoryId) {
        List<PostEntity> posts;

        if (categoryId != null) {
            posts = postRepository.findByCategoryId(categoryId);
        } else {
            posts = postRepository.findAll();
        }

        return posts.stream()
                .map(PostResponseDto::fromEntity)
                .collect(Collectors.toList());
    }
}
