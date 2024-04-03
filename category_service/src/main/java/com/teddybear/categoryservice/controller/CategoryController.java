package com.teddybear.categoryservice.controller;


import com.teddybear.categoryservice.entity.VideoCategory;
import com.teddybear.categoryservice.repository.CategoryRepository;
import com.teddybear.categoryservice.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category-service")
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

    @GetMapping("/category/{name}")
    public ResponseEntity<List<String>> getVideosbyCategry(@PathVariable String name) {
        List<String> response = categoryService.getVideosbyCategry(name);
        if (response != null) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
