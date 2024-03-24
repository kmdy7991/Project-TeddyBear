package com.ssafy.orderservice.dto;

import lombok.*;

import java.time.LocalDate;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Payload {
    private String order_id;
    private String user_id;
    private String product_id;
    private int qty;
    private int unit_price;
    private int total_price;
    private String create_at;

    @Builder
    public Payload(String orderId, String userId, String productId, int qty, int unitPrice, int totalPrice, String createAt){
        this.order_id = orderId;
        this.user_id = userId;
        this.product_id = productId;
        this.qty = qty;
        this.unit_price = unitPrice;
        this.total_price = totalPrice;
        this.create_at = createAt;
    }
}
