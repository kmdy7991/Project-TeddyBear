package com.example.wordservice.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
@Data
@AllArgsConstructor
public class ResponseWord {
    private Long id;
    private String eng;
    private String kor;
    private String part;
    private String tier;
}
