package com.example.wordservice.service;

import com.example.wordservice.jpa.WordEntity;
import com.example.wordservice.vo.RequestBookmarkWord;
import com.example.wordservice.vo.ResponseWord;

import java.util.Iterator;
import java.util.List;

public interface WordService {
    List<ResponseWord> getWordsByTier(String tier, String value);
    ResponseWord getWord(Long wordId);
    List<WordEntity> getBookmarkWordsBy(Long userId, String value);
    void deleteBookmarkByUserIdAndWordId(Long userId, WordEntity wordId);
    void createBookmarkword(RequestBookmarkWord requestBookmarkWord);
    void importWord() throws Exception;
    Boolean existBookmarkword(RequestBookmarkWord requestBookmarkWord);
}
