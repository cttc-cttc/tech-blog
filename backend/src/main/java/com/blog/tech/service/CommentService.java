package com.blog.tech.service;

import com.blog.tech.dto.CommentDto;
import com.blog.tech.entity.Comment;
import com.blog.tech.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    @Transactional
    public CommentDto addComment(Long postId, Long userId, String nickName, String content, Long parentId) {
        Comment parent = null;
        if (parentId != null) {
            parent = commentRepository.findById(parentId)
                    .orElseThrow(() -> new IllegalArgumentException("부모 댓글이 존재하지 않습니다."));
        }

        Comment comment = Comment.builder()
                .postId(postId)
                .userId(userId)
                .nickName(nickName)
                .content(content)
                .parent(parent)
                .build();

        Comment saved = commentRepository.save(comment);
        return CommentDto.fromEntity(saved);
    }

    @Transactional(readOnly = true)
    public List<CommentDto> getComments(Long postId) {
        return commentRepository.findByPostIdAndParentIsNullOrderByIdAsc(postId)
                .stream()
                .map(CommentDto::fromEntity)
                .collect(Collectors.toList());
    }
}
