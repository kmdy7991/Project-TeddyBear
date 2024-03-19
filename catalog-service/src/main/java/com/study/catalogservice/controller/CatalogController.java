package com.study.catalogservice.controller;

import com.study.catalogservice.service.CatalogService;
import com.study.catalogservice.vo.ResponseCatalog;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/catalog-service")
@RequiredArgsConstructor
public class CatalogController {
    private final CatalogService catalogService;
    private final Environment env;

    @GetMapping("/catalogs")
    public ResponseEntity<List<ResponseCatalog>> getCatalogs() {
        List<ResponseCatalog> catalogs = new ArrayList<>();
        catalogService.getAllCatalogs().forEach(v -> {
            catalogs.add(new ModelMapper().map(v, ResponseCatalog.class));
        });

        return ResponseEntity.ok(catalogs);
    }
}
