package com.example.wordservice.controller;

import com.example.wordservice.jpa.BookmarkWordEntity;
import com.example.wordservice.jpa.WordEntity;
import com.example.wordservice.vo.RequestBookmarkWord;
import com.example.wordservice.vo.RequestWord;
import com.example.wordservice.service.WordService;
import com.example.wordservice.vo.ResponseBookmarkWord;
import com.example.wordservice.vo.ResponseWord;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Iterator;
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
    public ResponseEntity<List<WordEntity>> getBookmarkwords(@PathVariable Long userId, @RequestParam(required = false, defaultValue = "word", value = "orderby") String value) {
        List<WordEntity> bookmarkList = wordService.getBookmarkWordsBy(userId, value);

        return ResponseEntity.status(HttpStatus.OK).body(bookmarkList);
    }

    @DeleteMapping("/bookmarkWords/{userId}/{wordId}") // 북마크 단어 삭제
    public ResponseEntity<String> deleteBookmarkByUserIdAndWordId(@PathVariable Long userId, @PathVariable WordEntity wordId) {
        wordService.deleteBookmarkByUserIdAndWordId(userId, wordId);
        return ResponseEntity.status(HttpStatus.OK).body("Bookmark deleted successfully.");
    }

    @PostMapping("/bookmarkWords") // 북마크 단어 생성
    public ResponseEntity<String> createBookmarkword(@RequestBody RequestBookmarkWord requestBookmarkWord) {
        wordService.createBookmarkword(requestBookmarkWord);

        return ResponseEntity.status(HttpStatus.OK).body("Bookmark saved successfully.");
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



}
