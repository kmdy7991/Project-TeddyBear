package com.teddybear.categoryservice.repository;

import com.teddybear.categoryservice.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}
