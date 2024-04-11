package com.teddybear.wordservice.service;

import com.teddybear.wordservice.jpa.WordEntity;
import com.teddybear.wordservice.vo.RequestBookmarkWord;
import com.teddybear.wordservice.vo.ResponseWord;

import java.util.List;

public interface WordService {
    List<ResponseWord> getWordsByTier(String tier, String value);
    ResponseWord getWord(Long wordId);
    List<ResponseWord> getBookmarkWordsBy(Long userId);
    void deleteBookmark(Long userId, Long wordId);
    void createBookmarkword(RequestBookmarkWord requestBookmarkWord);
    void importWord() throws Exception;
    Boolean existBookmarkword(RequestBookmarkWord requestBookmarkWord);
    List<ResponseWord> getDailyWordByTier(String tier);
}
