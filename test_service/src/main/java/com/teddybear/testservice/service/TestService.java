package com.teddybear.testservice.service;

import com.teddybear.testservice.repository.TestRepository;
import com.teddybear.testservice.vo.ResponseTest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestRepository repository;


    public List<ResponseTest> getAllTest() {
        return repository.findAll();
    }

    public List<ResponseTest> findRandomQuestionsByTier(String test_tier) {
        return repository.findRandomQuestionsByTier(test_tier);
    }

}