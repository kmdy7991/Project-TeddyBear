package com.ssafy.orderservice.messagequeue;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.ssafy.orderservice.dto.*;
import com.ssafy.orderservice.jpa.OrderEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Slf4j
@Service
@RequiredArgsConstructor
public class OrderProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;
    public void send(String topic, OrderEntity orderEntity) {
        ObjectMapper mapper = new ObjectMapper();
        Payload payload = Payload.builder()
                .orderId(orderEntity.getOrderId())
                .userId(orderEntity.getUserId())
                .productId(orderEntity.getProductId())
                .qty(orderEntity.getQty())
                .unitPrice(orderEntity.getUnitPrice())
                .totalPrice(orderEntity.getTotalPrice())
                .createAt(LocalDate.now().toString())
                .build();

        log.info("right now = {}", LocalDate.now());
        KafkaOrderDto kafkaOrderDto = KafkaOrderDto.builder()
                .schema(ConnectorConvert.schemaBuilder())
                .payload(payload)
                .build();
        String message = "";
        try {
            message = mapper.registerModule(new JavaTimeModule()).writeValueAsString(kafkaOrderDto);
            log.info("this message = {}", message);
        } catch (JsonProcessingException e){
            e.printStackTrace();
        }
        kafkaTemplate.send(topic, message);
        log.info("Kafka Producer sent data from th Order microservice: " + kafkaOrderDto);
    }
}