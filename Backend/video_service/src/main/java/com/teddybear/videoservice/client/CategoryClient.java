package com.teddybear.videoservice.client;

import com.teddybear.videoservice.client.dto.UserCategoryRequestDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("category-service")
public interface CategoryClient {
    @PostMapping("/category-service/category/user")
    Boolean countUpCategory(UserCategoryRequestDto requestDto);
}
