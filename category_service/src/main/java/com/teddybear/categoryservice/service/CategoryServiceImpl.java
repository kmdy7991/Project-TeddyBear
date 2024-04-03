package com.teddybear.categoryservice.service;

import com.teddybear.categoryservice.client.CategoryClient;
import com.teddybear.categoryservice.dto.CategoryResponseDto;
import com.teddybear.categoryservice.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryClient categoryClient;
    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponseDto> getCategorys() {
        return categoryClient.getCategory();
    }

    @Override
    public List<String> getVideosbyCategry(String category) {
        return categoryRepository.findVideoIdByCategory(category);
    }
}
