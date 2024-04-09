package com.teddybear.categoryservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Entity
@Table(name = "category")
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_seq")
    private int categorySeq;

    @Column(name = "category_name")
    private String categoryName;
}