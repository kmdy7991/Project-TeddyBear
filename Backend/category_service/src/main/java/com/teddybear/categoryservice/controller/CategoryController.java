package com.teddybear.categoryservice.controller;


import com.teddybear.categoryservice.dto.UserCategoryRequestDto;
import com.teddybear.categoryservice.entity.VideoCategory;
import com.teddybear.categoryservice.repository.CategoryRepository;
import com.teddybear.categoryservice.repository.VideoCategoryRepository;
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
    private final VideoCategoryRepository videoCategoryRepository;

    @PostMapping("/category/insert")
    public void getCategory() {
        categoryService.getCategorys()
                .forEach(i -> videoCategoryRepository.save(
                                VideoCategory.builder()
                                        .videoId(i.getVideoId())
                                        .category(i.getCategory())
                                        .build()
                        )
                );
        videoCategoryRepository.flush();
    }

    @GetMapping("/category/{name}")
    public ResponseEntity<List<String>> getVideosbyCategry(@PathVariable String name) {
        List<String> response = categoryService.getVideosbyCategry(name);
        if (response != null) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @PostMapping("/category/user")
    public ResponseEntity<Boolean> countUpCategory(@RequestBody UserCategoryRequestDto requestDto) {
        String categoryName = categoryService.getCategory(requestDto.getVideoId());
        boolean response = categoryService.countUpCategory(requestDto.getUserId(), categoryName);
        if (response) {
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
}
