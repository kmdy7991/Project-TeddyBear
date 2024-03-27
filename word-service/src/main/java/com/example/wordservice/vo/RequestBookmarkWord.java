package com.example.wordservice.vo;

import com.example.wordservice.jpa.WordEntity;
import lombok.Builder;
import lombok.Getter;

@Getter
public class RequestBookmarkWord {
    private WordEntity wordId;
    private Long  userId;

    @Builder
    public RequestBookmarkWord(WordEntity wordId, Long userId) {
        this.wordId = wordId;
        this.userId = userId;
    }
}
