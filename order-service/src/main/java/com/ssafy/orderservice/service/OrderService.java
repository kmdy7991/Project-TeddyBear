package com.ssafy.orderservice.service;

import com.ssafy.orderservice.dto.OrderDto;
import com.ssafy.orderservice.jpa.OrderEntity;

import java.util.List;

public interface OrderService {
    OrderDto createOrder(OrderDto orderDetails);
    OrderDto getOrderByOrderId(String orderId);
    List<OrderEntity> getOrdersByUserId(String userId);

}
