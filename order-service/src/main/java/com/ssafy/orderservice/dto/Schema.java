package com.ssafy.orderservice.dto;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@AllArgsConstructor
public class Schema {
    private String type;
    private List<Field> fields;
    private boolean optional;
    private String name;

    @Builder
    public Schema(String type, List<Field> fields, Boolean optional, String name){
        this.type = type;
        this.fields = fields;
        this.optional = optional;
        this.name = name;
    }
}
