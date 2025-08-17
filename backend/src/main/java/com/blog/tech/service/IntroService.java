package com.blog.tech.service;

import com.blog.tech.dto.IntroRequestDto;
import com.blog.tech.dto.IntroResponseDto;
import com.blog.tech.entity.ImageUrlEntity;
import com.blog.tech.entity.IntroEntity;
import com.blog.tech.repository.ImageUrlRepository;
import com.blog.tech.repository.IntroRepository;
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

    public List<IntroResponseDto> findAll() {
        return introRepository.findAll()
                .stream()
                .map(IntroResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    public IntroResponseDto createIntro(IntroRequestDto request) {

        IntroEntity intro = new IntroEntity();
        intro.setWriter(request.getWriter());
        intro.setContents(request.getContents());

        IntroEntity saved = introRepository.save(intro);
        List<String> images = request.getImages();
        if (!images.isEmpty()) {
            imageUrlRepository.markImagesAsUsed(images);
        }
        return IntroResponseDto.fromEntity(saved);
    }

    public IntroEntity findLastOne() {
        Optional<Integer> result = Optional.ofNullable(introRepository.findMostRecentId());
        return result.map(integer -> introRepository.findById(integer).get()).orElse(new IntroEntity());
    }

    public IntroResponseDto updateIntro(IntroRequestDto request) {
//        int id = Integer.parseInt(entity.getPost_id_str());
//        entity.setId(id);
//        introRepository.save(entity);
        IntroEntity intro = introRepository.findAll().getLast();

        Optional.ofNullable(intro).map(introEntity -> {
                introEntity.setContents(request.getContents());
                return introRepository.save(introEntity);
        })
        .orElseThrow(() -> new RuntimeException("intro not found"));

//        List<String> images = request.getImages();
//        if (!images.isEmpty()) {
//            imageUrlRepository.markImagesAsUsed(images);
//        }
        return IntroResponseDto.fromEntity(intro);
    }

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
