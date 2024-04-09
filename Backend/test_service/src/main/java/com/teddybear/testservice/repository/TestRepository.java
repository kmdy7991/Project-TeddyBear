package com.teddybear.testservice.repository;

import com.teddybear.testservice.vo.ResponseTest;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository extends MongoRepository<ResponseTest, String> {
    // 특정 티어에 해당하는 문제들을 test_type 별로 2개씩 랜덤하게 뽑는 메서드
    @Aggregation(pipeline = {
            "{ $match: { test_tier: ?0 } }", // 티어에 따라 필터링
    })
    List<ResponseTest> findRandomQuestionsByTier(String test_tier);
}
