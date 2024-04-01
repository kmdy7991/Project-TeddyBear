package com.teddybear.testservice.controller;

import com.teddybear.testservice.service.TestService;
import com.teddybear.testservice.vo.Option;
import com.teddybear.testservice.vo.ResponseTest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/test-service")
public class TestController {

    @Autowired
    private TestService service;

    private List<String> answer;

    @GetMapping("/get")
    public ResponseEntity<List<ResponseTest>> getAllTest() {
        List<ResponseTest> list = service.getAllTest();

        for (ResponseTest res : list) {
            System.out.println(res.getTest_question());
        }
        return new ResponseEntity<List<ResponseTest>>(service.getAllTest(), HttpStatus.OK);
    }

    @GetMapping("/test/{test_tier}")
    public ResponseEntity<?> findRandomQuestionsByTier(@PathVariable String test_tier) {

        answer = new ArrayList<>();

        try {
            List<ResponseTest> questions = service.findRandomQuestionsByTier(test_tier);
            Map<String, List<ResponseTest>> questionsByType = new HashMap<>();

            for (ResponseTest question : questions) {
                questionsByType.computeIfAbsent(question.getTest_type(), k -> new ArrayList<>()).add(question);
            }

            Map<String, List<ResponseTest>> randomQuestionsByType = new HashMap<>();
            questionsByType.forEach((type, questionList) -> {
                Collections.shuffle(questionList);
                randomQuestionsByType.put(type, questionList.stream().limit(2).collect(Collectors.toList()));
            });

            List<ResponseTest> randomQuestions = new ArrayList<>();
            randomQuestionsByType.values().forEach(randomQuestions::addAll);

            for (ResponseTest r : randomQuestions) {
                for (Option o : r.getOptions()) {
                    if (o.is_answer()) {
                        answer.add(o.getOption());
                    }
                }
            }

            log.info(answer.toString());

            return new ResponseEntity<List<ResponseTest>>(randomQuestions, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/test/result")
    public ResponseEntity<?> scoreCalculate(@RequestBody List<String> userAnswer) {

        int score = 0;

        try {
            if (answer.size() != userAnswer.size()) {
                return new ResponseEntity<String>("잘못된 접근", HttpStatus.NO_CONTENT);
            }
            for (int i = 0; i < answer.size(); i++) {
                if (answer.get(i).equals(userAnswer.get(i))) {
                    score++;
                }
            }
            return new ResponseEntity<Integer>(score, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
