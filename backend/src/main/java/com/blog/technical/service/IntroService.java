package com.blog.technical.service;

import com.blog.technical.entity.ImageUrlEntity;
import com.blog.technical.entity.IntroEntity;
import com.blog.technical.repository.ImageUrlRepository;
import com.blog.technical.repository.IntroRepository;
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

@Service
public class IntroService {

    private final IntroRepository introRepository;
    private final ImageUrlRepository imageUrlRepository;

    @Autowired
    public IntroService(IntroRepository introRepository, ImageUrlRepository imageUrlRepository) {
        this.introRepository = introRepository;
        this.imageUrlRepository = imageUrlRepository;
    }

    public void saveIntro(IntroEntity entity, List<String> images) {
        introRepository.save(entity);

        if (!images.isEmpty()) {
            imageUrlRepository.markImagesAsUsed(images);
        }
    }

    public IntroEntity findLastOne() {
        Optional<Integer> result = Optional.ofNullable(introRepository.findMostRecentId());
        return result.map(integer -> introRepository.findById(integer).get()).orElse(new IntroEntity());
    }

    public void updateIntro(IntroEntity entity, List<String> images) {
        int id = Integer.parseInt(entity.getPost_id_str());
        entity.setPost_id(id);
        introRepository.save(entity);

        if (!images.isEmpty()) {
            imageUrlRepository.markImagesAsUsed(images);
        }
    }

    public List<IntroEntity> findAll() {
        return introRepository.findAll();
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
