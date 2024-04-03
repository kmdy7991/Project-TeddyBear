package com.teddybear.videoservice.client;

import com.teddybear.videoservice.vo.PythonDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/concern/user/{userid}")
    String findConcernById(@PathVariable("userId") Long userId);
}
