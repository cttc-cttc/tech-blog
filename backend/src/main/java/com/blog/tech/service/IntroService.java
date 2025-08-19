package com.blog.tech.service;

import com.blog.tech.dto.IntroRequestDto;
import com.blog.tech.dto.IntroResponseDto;
import com.blog.tech.entity.ImageUrlEntity;
import com.blog.tech.entity.IntroEntity;
import com.blog.tech.repository.ImageUrlRepository;
import com.blog.tech.repository.IntroRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class IntroService {

    private final IntroRepository introRepository;
    private final ImageUrlRepository imageUrlRepository;

    /**
     * 소개 글 조회
     * 값이 있으면 Optional.of(dto)
     * 값이 없으면 Optional.empty()
     * @return
     */
    public Optional<IntroResponseDto> getIntro() {
        return introRepository.findById(1)
                .map(IntroResponseDto::fromEntity);
    }

    /**
     * 소개 글 등록 또는 수정
     * 등록 시 pk는 1로 고정
     * @param request
     * @return
     */
    public IntroResponseDto createOrUpdateIntro(IntroRequestDto request) {
        // map과 orElseGet의 return 타입이 같아야 함
        return introRepository.findById(1)
                .map(intro -> {
                    // 이미 있으면 수정
                    intro.setTitle(request.getTitle());
                    intro.setWriter(request.getWriter());
                    intro.setContents(request.getContents());

                    IntroEntity updated = introRepository.save(intro);
                    List<String> images = request.getImages();
                    if (!images.isEmpty()) {
                        imageUrlRepository.markImagesAsUsed(images);
                    }
                    return IntroResponseDto.fromEntity(updated);
                })
                .orElseGet(() -> {
                    // 없으면 최초 1회 저장
                    IntroEntity intro = new IntroEntity();
                    intro.setId(1); // 항상 id=1로 고정
                    intro.setTitle(request.getTitle());
                    intro.setWriter(request.getWriter());
                    intro.setContents(request.getContents());

                    IntroEntity saved = introRepository.save(intro);
                    List<String> images = request.getImages();
                    if (!images.isEmpty()) {
                        imageUrlRepository.markImagesAsUsed(images);
                    }
                    return IntroResponseDto.fromEntity(saved);
                });
    }

    /**
     * 에디터에서 이미지 첨부시 이미지를 db와 로컬에 각각 저장
     * @param file
     * @return
     */
    public String upload(MultipartFile file) {
        try {
            // 디렉토리 없으면 생성
            String uploadDir = "uploads/images";
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // 고유 파일명 생성
            String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filepath = Paths.get(uploadDir, filename);
            file.transferTo(filepath); // 실제 파일 저장

            String imageUrl = "/" + uploadDir + "/" + filename;

            // DB 저장
            ImageUrlEntity image = ImageUrlEntity.builder()
                    .url(imageUrl)
                    .used(false)
                    .build();
            imageUrlRepository.save(image);

            return imageUrl;

        } catch (IOException e) {
            throw new RuntimeException("이미지 저장 실패", e);
        }
    }
}
