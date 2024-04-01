package com.example.testservice.service;

import com.example.testservice.repository.TestRepository;
import com.example.testservice.vo.ResponseTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

@Service
public class TestService {

    private final TestRepository repository;

    @Autowired
    public TestService(TestRepository repository) {
        this.repository = repository;
    }

    public List<ResponseTest> getAllTest() {
        return repository.findAll();
    }

    public List<ResponseTest> findRandomQuestionsByTier(String test_tier) {
        return repository.findRandomQuestionsByTier(test_tier);
    }

}