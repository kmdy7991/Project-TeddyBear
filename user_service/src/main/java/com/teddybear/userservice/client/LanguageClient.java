package com.teddybear.userservice.client;

import com.teddybear.userservice.domain.dto.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "python-service")
public interface LanguageClient {
    @PostMapping("/language/user/info")
    List<String> videoIdInfo(UserDto.PythonDto pythonDto);
}
