package com.teddybear.videoservice.client;

import com.teddybear.videoservice.vo.PythonDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/user-service/user/concern/{userId}")
    Optional<String> findConcernById(@PathVariable("userId") Long userId);
}