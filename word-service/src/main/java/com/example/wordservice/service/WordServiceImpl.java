package com.example.wordservice.service;

import com.example.wordservice.jpa.BookmarkWordEntity;
import com.example.wordservice.jpa.BookmarkWordRepository;
import com.example.wordservice.jpa.WordEntity;
import com.example.wordservice.jpa.WordRepository;
import com.example.wordservice.vo.RequestBookmarkWord;
import com.example.wordservice.vo.ResponseWord;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class WordServiceImpl implements WordService{
    private final BookmarkWordRepository bookmarkWordRepository;
    private final WordRepository wordRepository;
    @Autowired
    public WordServiceImpl(BookmarkWordRepository bookmarkWordRepository, WordRepository wordRepository) {
        this.bookmarkWordRepository = bookmarkWordRepository;
        this.wordRepository = wordRepository;
    }

    @Override
    public List<ResponseWord> getWordsByTier(String tier, String value) {
        List<WordEntity> words = wordRepository.findByTier(tier);
        words.sort(Comparator.comparing(WordEntity::getEng)); // 알파벳 오름차순으로 정렬
        return words.stream().map(wordEntity -> new ResponseWord(wordEntity.getId(),
                wordEntity.getEng(),
                wordEntity.getKor(),
                wordEntity.getPart(),
                wordEntity.getTier())).toList();
    }

    @Override
    public List<WordEntity> getBookmarkWordsBy(Long userId, String value) {
        List<BookmarkWordEntity> bookmarkWordEntities = bookmarkWordRepository.findByUserId(userId);
        if (!bookmarkWordEntities.isEmpty()) {
            List<Long> wordIds = bookmarkWordEntities.stream()
                    .map(bookmarkWordEntity -> bookmarkWordEntity.getWordId().getId())
                    .collect(Collectors.toList());
            return wordRepository.findAllByIdIn(wordIds);
        } else {
            return new ArrayList<>(); // 유저에 해당하는 북마크된 단어가 없을 경우 빈 리스트를 반환
        }
    }

    @Override
    public void deleteBookmarkByUserIdAndWordId(Long userId, WordEntity wordId) {
        bookmarkWordRepository.deleteByUserIdAndWordId(userId, wordId);
    }

    @Override
    public RequestBookmarkWord createBookmarkword(RequestBookmarkWord requestBookmarkWord) {
        BookmarkWordEntity bookmarkWordEntity = BookmarkWordEntity.builder()
                .wordId(requestBookmarkWord.getWordId())
                .userId(requestBookmarkWord.getUserId())
                .build();
        bookmarkWordRepository.save(bookmarkWordEntity);
        return null;
    }


}
