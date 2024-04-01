package com.teddybear.testservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.mongodb.core.MongoTemplate;

@EnableDiscoveryClient
@SpringBootApplication
public class TestServiceApplication {

	@Autowired
	private MongoTemplate mongotemplate;

	public static void main(String[] args) {
		SpringApplication.run(TestServiceApplication.class, args);
	}
}
