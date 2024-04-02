package com.teddybear.categoryservice.controller;


import com.teddybear.categoryservice.entity.VideoCategory;
import com.teddybear.categoryservice.repository.CategoryRepository;
import com.teddybear.categoryservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;

    @PostMapping("/category/insert")
    public void getCategory() {
        categoryService.getCategorys()
                .forEach(i -> categoryRepository.save(
                                VideoCategory.builder()
                                        .videoId(i.getVideoId())
                                        .category(i.getCategory())
                                        .build()
                        )
                );
        categoryRepository.flush();
    }
}
