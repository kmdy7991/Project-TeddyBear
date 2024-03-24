package com.ssafy.orderservice.cotroller;

import com.ssafy.orderservice.dto.OrderDto;
import com.ssafy.orderservice.service.OrderService;
import com.ssafy.orderservice.vo.RequestOrder;
import com.ssafy.orderservice.vo.ResponseOrder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/order-service")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private final Environment env;

    @GetMapping("/is-in")
    public String status() {
        return String.format("order-service port %s", env.getProperty("local.server.port"));
    }

    @PostMapping("/{userId}/orders")
    public ResponseEntity<ResponseOrder> createOrder(@PathVariable("userId") String userId,
                                                     @RequestBody RequestOrder requestOrder) {
        log.info("Before retrieve orders data");
        OrderDto order = orderService.createOrder(OrderDto.builder()
                .userId(userId)
                .productId(requestOrder.getProductId())
                .qty(requestOrder.getQty())
                .unitPrice(requestOrder.getUnitPrice())
                .build());
        log.info("OrderDto = {} ", order);

        ResponseOrder returnValue = ResponseOrder.builder()
                .productId(order.getProductId())
                .qty(order.getQty())
                .unitPrice(order.getUnitPrice())
                .totalPrice(order.getTotalPrice())
                .createAt(order.getCreateAt())
                .build();

        log.info("After retrieve orders data");
        return ResponseEntity.status(HttpStatus.CREATED).body(returnValue);

    }

    @GetMapping("/{userId}/orders")
    public ResponseEntity<List<ResponseOrder>> getOrder(@PathVariable("userId") String userId) {
        log.info("Before retrieve orders data");
        List<ResponseOrder> result = new ArrayList<>();

        orderService.getOrdersByUserId(userId).forEach(v -> {
            result.add(
                    ResponseOrder.builder()
                            .productId(v.getProductId())
                            .qty(v.getQty())
                            .unitPrice(v.getUnitPrice())
                            .totalPrice(v.getTotalPrice())
                            .createAt(v.getCreateAt())
                            .build()
            );
        });
        log.info("After retrieve orders data");

        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }
}
