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

    @GetMapping("/words/{tier}")
    public ResponseEntity<List<ResponseWord>> getWords(@PathVariable String tier, @RequestParam(required = false, defaultValue = "tier", value = "orderby") String value) {
        List<ResponseWord> wordDtoList = wordService.getWordsByTier(tier, value);

        return ResponseEntity.status(HttpStatus.OK).body(wordDtoList);
    }

    @GetMapping("/bookmarkWords/{userId}")
    public ResponseEntity<List<WordEntity>> getBookmarkwords(@PathVariable Long userId, @RequestParam(required = false, defaultValue = "word", value = "orderby") String value) {
        List<WordEntity> bookmarkList = wordService.getBookmarkWordsBy(userId, value);

        return ResponseEntity.status(HttpStatus.OK).body(bookmarkList);
    }

    @DeleteMapping("/bookmarkWords/{userId}/{wordId}")
    public ResponseEntity<String> deleteBookmarkByUserIdAndWordId(@PathVariable Long userId, @PathVariable WordEntity wordId) {
        wordService.deleteBookmarkByUserIdAndWordId(userId, wordId);
        return ResponseEntity.status(HttpStatus.OK).body("Bookmark deleted successfully.");
    }

    @PostMapping("/bookmarkWords")
    public ResponseEntity<String> createBookmarkword(@RequestBody RequestBookmarkWord requestBookmarkWord) {
        wordService.createBookmarkword(requestBookmarkWord);

        return ResponseEntity.status(HttpStatus.OK).body("Bookmark saved successfully.");
    }

}
