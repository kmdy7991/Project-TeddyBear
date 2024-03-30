package com.example.wordservice.vo;

import com.example.wordservice.jpa.WordEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RequestBookmarkWord {
    private Long wordId;
    private Long userId;
}
