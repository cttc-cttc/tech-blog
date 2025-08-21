package com.blog.tech.controller;

import com.blog.tech.dto.CommentDto;
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
    public ResponseEntity<List<CommentDto>> getComments(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getComments(postId));
    }

    // 댓글/대댓글 작성
    @PostMapping("/comments")
    public ResponseEntity<CommentDto> addComment(@RequestBody CommentRequestDto request) {
        CommentDto comment = commentService.addComment(
                request.getPostId(),
                request.getUserId(),
                request.getNickName(),
                request.getContent(),
                request.getParentId());
        return ResponseEntity.ok(comment);
    }
}