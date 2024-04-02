package com.teddybear.videoservice.client;

import com.teddybear.videoservice.vo.PythonDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "language-service")
public interface LanguageClient {
    @PostMapping("/language/user/info")
    List<String> videoIdInfo(@RequestBody PythonDto pythonDto);
}
