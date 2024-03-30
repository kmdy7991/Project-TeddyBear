package com.example.videoservice.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResponseNote {
    private Long id;
    private String note;
    private LocalDateTime noteDate;
}
