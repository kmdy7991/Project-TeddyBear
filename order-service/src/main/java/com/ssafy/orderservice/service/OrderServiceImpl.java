package com.ssafy.orderservice.service;

import com.ssafy.orderservice.dto.OrderDto;
import com.ssafy.orderservice.jpa.OrderEntity;
import com.ssafy.orderservice.jpa.OrderRepository;
import com.ssafy.orderservice.messagequeue.OrderProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final OrderProducer orderProducer;

    @Override
    public OrderDto createOrder(OrderDto orderDto) {
        orderDto.setOrderId();
        orderDto.calculatePrice(orderDto.getQty(), orderDto.getUnitPrice());

        OrderEntity orderEntity = OrderEntity.builder()
                .productId(orderDto.getUserId())
                .qty(orderDto.getQty())
                .unitPrice(orderDto.getUnitPrice())
                .totalPrice(orderDto.getTotalPrice())
                .userId(orderDto.getUserId())
                .orderId(orderDto.getOrderId())
                .build();

        orderProducer.send("orders", orderEntity);

        return OrderDto.builder()
                .userId(orderEntity.getUserId())
                .productId(orderEntity.getProductId())
                .qty(orderEntity.getQty())
                .unitPrice(orderEntity.getUnitPrice())
                .totalPrice(orderEntity.getTotalPrice())
                .orderId(orderEntity.getOrderId())
                .createAt(orderEntity.getCreateAt())
                .build();
    }

    @Override
    public OrderDto getOrderByOrderId(String orderId) {
        OrderEntity findOrderEntity = orderRepository.findByOrderId(orderId);

        return OrderDto.builder()
                .userId(findOrderEntity.getUserId())
                .productId(findOrderEntity.getProductId())
                .qty(findOrderEntity.getQty())
                .unitPrice(findOrderEntity.getUnitPrice())
                .totalPrice(findOrderEntity.getTotalPrice())
                .orderId(findOrderEntity.getOrderId())
                .build();
    }

    @Override
    public List<OrderEntity> getOrdersByUserId(String userId) {
        return orderRepository.findByUserId(userId);
    }
}
