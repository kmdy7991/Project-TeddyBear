package com.teddybear.categoryservice.service;

import com.teddybear.categoryservice.dto.CategoryResponseDto;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDto> getCategorys();
    List<String> getVideosbyCategry(String category);
    String getCategory(String videoId);
    boolean countUpCategory(Long userId, String category);
}
