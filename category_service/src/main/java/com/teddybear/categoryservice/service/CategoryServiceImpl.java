package com.teddybear.categoryservice.service;

import com.teddybear.categoryservice.client.CategoryClient;
import com.teddybear.categoryservice.response.CategoryResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{
    private final CategoryClient categoryClient;

    @Override
    public List<CategoryResponseDto> getCategorys() {
        return categoryClient.getCategory();
    }
}
