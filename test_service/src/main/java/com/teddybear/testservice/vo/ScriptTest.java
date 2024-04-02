package com.teddybear.testservice.vo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "script")
public class ScriptTest {
    @Id
    @Column(name = "script_seq")
    private Long scriptSeq;

    @Column(name = "video_id")
    private String videoId;

    @Column(columnDefinition = "text")
    private String content;

    @Column(columnDefinition = "text")
    private String transcript;
}
