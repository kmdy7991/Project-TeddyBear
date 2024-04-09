package com.teddybear.categoryservice.client;

import com.teddybear.categoryservice.dto.CategoryResponseDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "language-service")
public interface CategoryClient {
    @PostMapping("/category/info")
    List<CategoryResponseDto> getCategory();
}
