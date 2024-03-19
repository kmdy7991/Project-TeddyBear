package com.study.catalogservice.service;

import com.study.catalogservice.jpa.CatalogEntity;

import java.util.List;

public interface CatalogService {
    List<CatalogEntity> getAllCatalogs();
}
