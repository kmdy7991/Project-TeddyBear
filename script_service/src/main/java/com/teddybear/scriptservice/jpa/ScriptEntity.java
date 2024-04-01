package com.example.scriptservice.jpa;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "script")
public class ScriptEntity {
    @Id
    @Column(name = "script_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String  content;

    @Column(nullable = false, length = 100)
    private String videoId;

}
