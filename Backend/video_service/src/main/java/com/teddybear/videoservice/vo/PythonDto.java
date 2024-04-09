package com.teddybear.videoservice.vo;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PythonDto {
    private List<VideoDto> videoDtoList;
    private String concern;
}