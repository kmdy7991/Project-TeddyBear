package com.study.catalogservice.jpa;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Getter
@Table(name = "catalog")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CatalogEntity implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @Column(nullable = false, length = 120, unique = true)
    private String productId;
    @Column(nullable = false)
    private String productName;
    @Column(nullable = false)
    private Integer stock;
    @Column(nullable = false)
    private Integer unitPrice;

    @Column(nullable = false, updatable = false, insertable = false)
    // defalut 값으로 current_timestamp 사용
    @ColumnDefault(value = "(CURRENT_DATE)")
    private LocalDate createAt;

    public void calculateStock(int stock, int qty){
        this.stock = stock - qty;
    }

    @Builder
    public CatalogEntity(String productId, String productName, int stock, int unitPrice){
        this.productId = productId;
        this.productName = productName;
        this.stock = stock;
        this.unitPrice = unitPrice;
    }
}
