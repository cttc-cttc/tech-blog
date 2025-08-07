package com.blog.tech.dto;

import com.blog.tech.entity.CategoryEntity;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class CategoryTreeResponseDto {
    private Long id;
    private String name;
    private List<CategoryTreeResponseDto> children = new ArrayList<>();

    public CategoryTreeResponseDto(CategoryEntity category) {
        this.id = category.getId();
        this.name = category.getName();
        this.children = category.getChildren().stream()
                .map(CategoryTreeResponseDto::new)
                .collect(Collectors.toList());
    }
}
