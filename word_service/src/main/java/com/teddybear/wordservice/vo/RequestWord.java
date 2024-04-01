package com.teddybear.wordservice.vo;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RequestWord {
    private Long id;
    private String eng;
    private String kor;
    private String part;
    private String tier;
}
