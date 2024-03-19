package com.ssafy.orderservice.vo;

import lombok.*;

@Data
public class RequestOrder {
    private String productId;
    private Integer qty;
    private Integer unitPrice;
}
