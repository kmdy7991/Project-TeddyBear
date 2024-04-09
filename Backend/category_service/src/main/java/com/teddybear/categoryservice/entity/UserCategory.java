package com.teddybear.categoryservice.entity;

import com.teddybear.categoryservice.entity.userService.User;
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

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(columnDefinition = "bigint default 0")
    private Long life;

    @Column(columnDefinition = "bigint default 0")
    private Long society;

    @Column(columnDefinition = "bigint default 0")
    private Long it;

    @Column(columnDefinition = "bigint default 0")
    private Long sports;

    @Column(columnDefinition = "bigint default 0")
    private Long world;

    @Column(columnDefinition = "bigint default 0")
    private Long politics;

    @Column(columnDefinition = "bigint default 0")
    private Long economy;
}
