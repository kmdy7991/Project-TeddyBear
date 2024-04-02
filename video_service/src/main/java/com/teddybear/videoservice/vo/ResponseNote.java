package com.teddybear.videoservice.vo;

import com.teddybear.videoservice.serializer.ResponseNoteSerializer;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@JsonSerialize(using = ResponseNoteSerializer.class)
public class ResponseNote {
    private Long id;
    private String note;
    private LocalDateTime noteDate;
    private Long videoId;
    private String videoTitle;
}
