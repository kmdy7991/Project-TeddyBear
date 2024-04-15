package com.teddybear.wordservice.controller;

import com.teddybear.wordservice.jpa.WordEntity;
import com.teddybear.wordservice.vo.RequestBookmarkWord;
import com.teddybear.wordservice.service.WordService;
import com.teddybear.wordservice.vo.ResponseWord;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/word-service")
@RequiredArgsConstructor
public class WordController {
    private final WordService wordService;

    @GetMapping("/words/{tier}") // 티어별 영단어 조회
    public ResponseEntity<List<ResponseWord>> getWords(@PathVariable String tier, @RequestParam(required = false, defaultValue = "tier", value = "orderby") String value) {
        List<ResponseWord> wordDtoList = wordService.getWordsByTier(tier, value);

        return ResponseEntity.status(HttpStatus.OK).body(wordDtoList);
    }

    @GetMapping("/word/{wordId}") // 단어 1개 조회
    public ResponseEntity<ResponseWord> getWords(@PathVariable Long wordId) {
        ResponseWord responseWord = wordService.getWord(wordId);

        return ResponseEntity.status(HttpStatus.OK).body(responseWord);
    }

    @GetMapping("/bookmarkWords/{userId}") // 북마크 단어 조회
    public ResponseEntity<List<ResponseWord>> getBookmarkwords(@PathVariable Long userId) {
        List<ResponseWord> bookmarkList = wordService.getBookmarkWordsBy(userId);

        return ResponseEntity.status(HttpStatus.OK).body(bookmarkList);
    }

    @DeleteMapping("/bookmarkWords/{userId}/{wordId}") // 북마크 단어 삭제
    public ResponseEntity<String> deleteBookmarkword(@PathVariable Long userId, @PathVariable Long wordId) {
        wordService.deleteBookmark(userId, wordId);
        return ResponseEntity.status(HttpStatus.OK).body("Bookmark deleted successfully.");
    }

    @PostMapping("/bookmarkWords") // 북마크 단어 생성
    public ResponseEntity<String> createBookmarkword(@RequestBody RequestBookmarkWord requestBookmarkWord) {
        wordService.createBookmarkword(requestBookmarkWord);

        return ResponseEntity.status(HttpStatus.OK).body("Bookmark saved successfully.");
    }

    @GetMapping("/bookmarkWords/isExist") // 북마크 단어 유무
    public ResponseEntity<Boolean> existBookmarkword(@RequestBody RequestBookmarkWord requestBookmarkWord) {
        Boolean isExist = wordService.existBookmarkword(requestBookmarkWord);

        return ResponseEntity.status(HttpStatus.OK).body(isExist);
    }

    @PostMapping("/importWord") // 단어 넣기
    public ResponseEntity<String> importWord() {
        try {
            wordService.importWord();
            return ResponseEntity.status(HttpStatus.OK).body("Word imported successfully.");
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to import word: " + e.getMessage());
        }
    }

    @GetMapping("/dailyWord/{tier}") // 티어에 맞는 오늘의 단어
    public ResponseEntity<List<ResponseWord>> getDailyWord(@PathVariable String tier) {
        List<ResponseWord> responseWords = wordService.getDailyWordByTier(tier);
        return ResponseEntity.status(HttpStatus.OK).body(responseWords);
    }



}
