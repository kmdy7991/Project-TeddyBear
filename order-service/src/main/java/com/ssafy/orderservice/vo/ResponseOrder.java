package com.ssafy.orderservice.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.time.LocalDate;
@Getter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseOrder {
    private String productId;
    private Integer qty;
    private Integer unitPrice;
    private Integer totalPrice;
    private LocalDate createAt;
    private String orderId;

    public ResponseOrder(){}

    @Builder
    public ResponseOrder(String productId, int qty, int unitPrice, int totalPrice, LocalDate createAt, String orderId){
        this.productId = productId;
        this.qty = qty;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
        this.createAt = createAt;
        this.orderId = orderId;
    }
}
