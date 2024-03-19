//package com.ssafy.orderservice.messagequeue;
//
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.ssafy.orderservice.dto.OrderDto;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Service;
//
//@Slf4j
//@Service
//@RequiredArgsConstructor
//public class KafkaProducer {
//    private final KafkaTemplate<String, String> kafkaTemplate;
//
//    public OrderDto send(String topic, OrderDto orderDto) {
//        ObjectMapper mapper = new ObjectMapper();
//        String message = "";
//        try {
//            message = mapper.writeValueAsString(orderDto);
//        } catch (JsonProcessingException e){
//            e.printStackTrace();
//        }
//        kafkaTemplate.send(topic, message);
//        log.info("Kafka Producer sent data from th Order microservice: " + orderDto);
//        return orderDto;
//    }
//}
