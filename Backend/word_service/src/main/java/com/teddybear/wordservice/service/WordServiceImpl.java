package com.teddybear.wordservice.service;


import com.teddybear.wordservice.jpa.*;
import com.teddybear.wordservice.vo.RequestBookmarkWord;
import com.teddybear.wordservice.vo.ResponseWord;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.json.simple.parser.JSONParser;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.FileReader;
import java.io.Reader;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class WordServiceImpl implements WordService{
    private final BookmarkWordRepository bookmarkWordRepository;
    private final WordRepository wordRepository;
    private final DailyWordRepository dailyWordRepository;
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    public WordServiceImpl(BookmarkWordRepository bookmarkWordRepository, WordRepository wordRepository, DailyWordRepository dailyWordRepository) {
        this.bookmarkWordRepository = bookmarkWordRepository;
        this.wordRepository = wordRepository;
        this.dailyWordRepository = dailyWordRepository;
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
    public ResponseWord getWord(Long wordId) {
        WordEntity wordEntity = wordRepository.findById(wordId).orElse(null);
        return ResponseWord.builder()
                .id(wordEntity.getId())
                .eng(wordEntity.getEng())
                .kor(wordEntity.getKor())
                .part(wordEntity.getPart())
                .tier(wordEntity.getTier())
                .build();
    }

    @Override
    public List<WordEntity> getBookmarkWordsBy(Long userId, String value) {
        List<BookmarkWordEntity> bookmarkWordEntities = bookmarkWordRepository.findByUserId(userId);
        if (!bookmarkWordEntities.isEmpty()) {
            List<Long> wordIds = bookmarkWordEntities.stream()
                    .map(bookmarkWordEntity -> bookmarkWordEntity.getWord().getId())
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
    public void createBookmarkword(RequestBookmarkWord requestBookmarkWord) {
        Long wordId = requestBookmarkWord.getWordId();
//        System.out.println("wordId: " + wordId);
        WordEntity wordEntity = wordRepository.findById(wordId).orElse(null);
        Long userId = requestBookmarkWord.getUserId();
//        System.out.println("userId: " + userId);

        boolean exists = bookmarkWordRepository.existsByIdAndUserId(wordId, userId);
//        System.out.println("exists: " + exists);

        if (!exists) {
            BookmarkWordEntity bookmarkWordEntity = BookmarkWordEntity.builder()
                    .word(wordEntity)
                    .userId(userId)
                    .build();
            bookmarkWordRepository.save(bookmarkWordEntity);
        }
    }
    @Override
    public Boolean existBookmarkword(RequestBookmarkWord requestBookmarkWord) {
        Long wordId = requestBookmarkWord.getWordId();
        Long userId = requestBookmarkWord.getUserId();
        return bookmarkWordRepository.existsByIdAndUserId(wordId, userId);
    }

    @Transactional
    public void importWord() throws Exception {
        JSONParser parser = new JSONParser();
        Reader reader = new FileReader("src/main/resources/word.json");
        JSONArray dataArray = (JSONArray) parser.parse(reader);

        for (Object obj : dataArray) {
            JSONObject jsonWord = (JSONObject) obj;
            String eng = (String) jsonWord.get("eng");
            String kor = (String) jsonWord.get("kor");
            String part = (String) jsonWord.get("part");
            String tier = (String) jsonWord.get("tier");

            WordEntity wordEntity = WordEntity.builder()
                    .eng(eng)
                    .kor(kor)
                    .part(part)
                    .tier(tier)
                    .build();
            entityManager.persist(wordEntity);

        }
    }


//    @Scheduled(cron = "0 46 20 * * *")
    @Scheduled(fixedRate = 300000) // 5분마다 갱신
    public void createDailyWord() {
        // 기존 데이터 삭제
        dailyWordRepository.deleteAll();
        String[] tierArr = {"A1", "A2", "B1", "B2", "C1", "C2"};

        for(int i=0; i<6; i++) {
            List<WordEntity> words = wordRepository.findByTier(tierArr[i]);
            // 랜덤으로 10개 가져오기
            List<WordEntity> selectedWords = getRandomWords(words, 10);

            // DailyWordEntity에 저장
            for(WordEntity wordEntity : selectedWords) {
                DailyWordEntity dailyWordEntity = DailyWordEntity.builder()
                        .wordId(wordEntity.getId())
                        .eng(wordEntity.getEng())
                        .kor(wordEntity.getKor())
                        .part(wordEntity.getPart())
                        .tier(wordEntity.getTier())
                        .build();

                dailyWordRepository.save(dailyWordEntity);
            }
        }
    }

    public List<WordEntity> getRandomWords(List<WordEntity> words, int num) {
        // 복사
        List<WordEntity> shuffledWords = new ArrayList<>(words);
        // 섞기
        Collections.shuffle(shuffledWords);
        // 저장 리스트 생성
        List<WordEntity> selectedWords = new ArrayList<>();
        // 저장
        for(int i=0; i<num; i++) {
            selectedWords.add(shuffledWords.get(i));
        }
        return selectedWords;
    }


    @Override
    public List<ResponseWord> getDailyWordByTier(String tier) {
        List<DailyWordEntity> dailyWordEntities = dailyWordRepository.findByTier(tier);
        List<ResponseWord> responseWords = new ArrayList<>();
        for(DailyWordEntity dailyWordEntity : dailyWordEntities) {
            ResponseWord responseWord = ResponseWord.builder()
                    .id(dailyWordEntity.getWordId())
                    .eng(dailyWordEntity.getEng())
                    .kor(dailyWordEntity.getKor())
                    .part(dailyWordEntity.getPart())
                    .tier(dailyWordEntity.getTier())
                    .build();

            responseWords.add(responseWord);
        }
        return responseWords;
    }




}
