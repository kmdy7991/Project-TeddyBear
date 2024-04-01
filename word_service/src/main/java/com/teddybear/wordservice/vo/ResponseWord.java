package com.teddybear.wordservice.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
@Data
@AllArgsConstructor
@Builder
public class ResponseWord {
    private Long id;
    private String eng;
    private String kor;
    private String part;
    private String tier;
}
