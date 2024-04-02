package com.teddybear.testservice.vo;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Document("upgrade_test")
public class ResponseTest {
    @Id
    private String id;
    private String test_id;
    private String test_tier;
    private String test_type;
    private String test_question;
    private List<Option> options;
}
