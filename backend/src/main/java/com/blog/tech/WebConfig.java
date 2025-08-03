package com.blog.tech;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // /uploads/**로 요청이 오면 실제 파일 시스템의 uploads/ 디렉토리에서 제공
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}
