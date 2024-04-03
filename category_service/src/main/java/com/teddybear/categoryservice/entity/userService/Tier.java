package com.teddybear.categoryservice.entity.userService;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tier_seq")
    private Long tierSeq;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_seq")
    private User user;

    @Column(name = "tier_name")
    private String tierName;

    @Column(name = "tier_exp", columnDefinition = "bigint default 0")
    private Long tierExp;

    @Column(nullable = false, columnDefinition = "integer default 1")
    private int level;

    @Column(name = "level_exp", columnDefinition = "bigint default 0")
    private Long levelExp;
}
