package com.blog.tech.service;

import com.blog.tech.dto.CommentResponseDto;
import com.blog.tech.dto.PostResponseDto;
import com.blog.tech.entity.CommentEntity;
import com.blog.tech.entity.PostEntity;
import com.blog.tech.repository.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;

    // 댓글/답글 추가
    @Transactional
    public CommentResponseDto addComment(Long postId, String userId, String nickName, String content, Long parentId) {
        CommentEntity parent = null;
        if (parentId != null) {
            parent = commentRepository.findById(parentId)
                    .orElseThrow(() -> new IllegalArgumentException("부모 댓글이 존재하지 않습니다."));
        }

        CommentEntity comment = CommentEntity.builder()
                .post(PostEntity.builder().id(postId).build())
                .userId(userId)
                .nickName(nickName)
                .content(content)
                .parent(parent)
                .build();

        CommentEntity saved = commentRepository.save(comment);
        return CommentResponseDto.fromEntity(saved);
    }

    // 댓글 조회
    @Transactional(readOnly = true)
    public List<CommentResponseDto> getComments(Long postId) {
        return commentRepository.findCommentsWithChildren(postId)
                .stream()
                .map(CommentResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    // 댓글 수정
    public CommentResponseDto updateComment(Long id, String userId, String content) {
        CommentEntity comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("댓글이 존재하지 않습니다."));

        if (!comment.getUserId().equals(userId)) {
            throw new RuntimeException("본인 댓글만 수정할 수 있습니다.");
        }

        comment.setContent(content);
        commentRepository.save(comment);

        return CommentResponseDto.fromEntity(comment);
    }

    // 댓글 소프트 삭제
    @Transactional
    public void deleteComment(Long id, String userId) {
        CommentEntity comment = commentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("댓글이 존재하지 않습니다."));

        if (!comment.getUserId().equals(userId)) {
            throw new RuntimeException("본인 댓글만 삭제할 수 있습니다.");
        }

        markDeleted(comment);
    }
    private void markDeleted(CommentEntity comment) {
        comment.setDelFlag(true);

        if(comment.getChildren() != null) {
            for(CommentEntity child : comment.getChildren()) {
                markDeleted(child); // 재귀 호출
            }
        }
    }

    /**
     * 마이페이지 - 내가 쓴 댓글 불러오기
     * @param userId
     * @param pageable
     * @return
     */
    public Page<CommentResponseDto> getMyCommentPage(String userId, Pageable pageable) {
        return commentRepository.findCommentsWithChildrenAndPostAndCategoryPage(userId, pageable)
                .map(CommentResponseDto::fromEntity);
    }

    /**
     * 관리자 페이지 - 게시글의 모든 댓글 리스트 불러오기
     * @param pageable
     * @return
     */
    public Page<CommentResponseDto> getCommentList(Pageable pageable) {
        return commentRepository.findAllPage(pageable)
                .map(CommentResponseDto::fromEntity);
    }
}
