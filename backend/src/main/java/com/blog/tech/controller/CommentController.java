package com.blog.tech.controller;

import com.blog.tech.dto.CommentResponseDto;
import com.blog.tech.dto.CommentRequestDto;
import com.blog.tech.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    // 댓글 조회
    @GetMapping("/comments/{postId}")
    public ResponseEntity<List<CommentResponseDto>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getComments(postId));
    }

    // 댓글/대댓글 작성
    @PostMapping("/comments")
    public ResponseEntity<CommentResponseDto> addComment(@RequestBody CommentRequestDto request) {
        CommentResponseDto comment = commentService.addComment(
                request.getPostId(),
                request.getUserId(),
                request.getNickName(),
                request.getContent(),
                request.getParentId());
        return ResponseEntity.ok(comment);
    }

    // 댓글 수정
    @PutMapping("/comments/{id}")
    public ResponseEntity<CommentResponseDto> updateComment(@PathVariable Long id, @RequestBody CommentRequestDto request) {
        CommentResponseDto updated = commentService.updateComment(id, request.getUserId(), request.getContent());
        return ResponseEntity.ok(updated);
    }

    // 댓글 소프트 삭제
    @PatchMapping("/comments/{id}")
    public ResponseEntity<Void> deleteComment(
            @PathVariable Long id,
            @RequestParam String userId
    ) {
        commentService.deleteComment(id, userId);
        return ResponseEntity.noContent().build();
    }
}