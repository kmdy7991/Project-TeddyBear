package com.teddybear.categoryservice.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@Table(name = "user_category")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_category_seq")
    private Long userCategorySeq;

    // eager가 아니라 lazy인 이유? =====================
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category", nullable = false)
    private Category category;

    @Column(name = "user_seq")
    private Long userSeq;

    // 유저와 연관관계 수정 =============================
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "user_seq", nullable = false)
//    private User user;
}
