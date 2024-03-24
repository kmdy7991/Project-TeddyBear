package com.ssafy.orderservice.messagequeue;

import com.ssafy.orderservice.dto.Field;
import com.ssafy.orderservice.dto.Schema;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class ConnectorConvert {
    private static List<Field> orderConnect() {
        return Arrays.asList(
                new Field("string", true, "order_id"),
                new Field("string", true, "user_id"),
                new Field("string", true, "product_id"),
                new Field("int32", true, "qty"),
                new Field("int32", true, "unit_price"),
                new Field("int32", true, "total_price"),
                new Field("string", true, "create_at")
        );
    }

    public static Schema schemaBuilder() {
        return Schema.builder()
                .type("struct")
                .fields(orderConnect())
                .optional(false)
                .name("orders")
                .build();
    }
}
