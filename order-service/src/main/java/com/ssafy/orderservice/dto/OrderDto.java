package com.ssafy.orderservice.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@ToString
public class OrderDto implements Serializable {
    private String productId;
    private Integer qty;
    private Integer unitPrice;
    private Integer totalPrice;
    private String orderId;
    private String userId;
    private LocalDate createAt;

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setOrderId() {
        this.orderId = UUID.randomUUID().toString();
    }

    public void calculatePrice(int qty, int unitPrice) {
        this.totalPrice = qty * unitPrice;
    }

    public OrderDto() {
    }

    @Builder
    public OrderDto(String userId, String productId, int qty, int unitPrice, int totalPrice, LocalDate createAt, String orderId) {
        this.userId = userId;
        this.productId = productId;
        this.qty = qty;
        this.unitPrice = unitPrice;
        this.totalPrice = totalPrice;
        this.orderId = orderId;
        this.createAt = createAt;
    }
}