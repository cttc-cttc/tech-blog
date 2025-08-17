package com.blog.tech.controller;

import com.blog.tech.dto.IntroRequestDto;
import com.blog.tech.dto.IntroResponseDto;
import com.blog.tech.entity.IntroEntity;
import com.blog.tech.service.IntroService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class IntroController {

    private final IntroService introService;

    /**
     * intro 조회 (intro는 1개만 작성하고 그 이후부터는 계속 수정만 가능하게 함)
     * @return
     */
    @GetMapping("/intro")
    public ResponseEntity<IntroResponseDto> getIntro() {
        return ResponseEntity.ok(introService.findAll().getLast());
    }

    /**
     * intro 등록
     * @param request
     * @return
     */
    @PostMapping("intro")
    public ResponseEntity<IntroResponseDto> createIntro(@RequestBody IntroRequestDto request) {
        return ResponseEntity.ok(introService.createIntro(request));
    }

    /**
     * intro 수정
     * @param request
     * @return
     */
    @PutMapping("/intro")
    public ResponseEntity<IntroResponseDto> updateIntro(@RequestBody IntroRequestDto request) {
        return ResponseEntity.ok(introService.updateIntro(request));
    }
}
