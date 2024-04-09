package com.teddybear.videoservice.client;

import com.teddybear.videoservice.vo.PythonDto;
import com.teddybear.videoservice.vo.ResponseRecommendDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;

import java.util.List;

@FeignClient(name = "language-service")
public interface LanguageClient {
    @PostMapping("/recommend/info")
    List<ResponseRecommendDto> videoIdInfo(PythonDto pythonDto);
}
