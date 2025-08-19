package com.blog.tech.dto;

import com.blog.tech.entity.IntroEntity;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class IntroResponseDto {
    private String title;
    private String writer;
    private String contents;

    public static IntroResponseDto fromEntity(IntroEntity intro) {
        return IntroResponseDto.builder()
                .title(intro.getTitle())
                .writer(intro.getWriter())
                .contents(intro.getContents())
                .build();
    }
}
