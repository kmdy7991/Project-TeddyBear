package com.teddybear.categoryservice.service;

import com.teddybear.categoryservice.response.CategoryResponseDto;

import java.util.List;

public interface CategoryService {
    List<CategoryResponseDto> getCategorys();
}
