package com.ssafy.orderservice.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class KafkaOrderDto implements Serializable {
    private Schema schema;
    private Payload payload;

    @Builder
    public KafkaOrderDto(Schema schema, Payload payload){
        this.schema = schema;
        this.payload = payload;
    }
}
