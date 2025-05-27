package com.bt1rs.bt_backend.controller;

import com.bt1rs.bt_backend.model.Product;
import com.bt1rs.bt_backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService service;

    @GetMapping
    public List<Product> getProducts() {
        return service.getAllProducts();
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        return ResponseEntity.ok(service.createProduct(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        return ResponseEntity.ok(service.updateProduct(id, product));
    }

    @PostMapping("/{id}/outofstock")
    public ResponseEntity<Product> updateOutOfStock(@PathVariable Long id) {
        return ResponseEntity.ok(service.markOutOfStock(id));
    }

    @PutMapping("/{id}/instock")
    public ResponseEntity<Product> updateInstock(@PathVariable Long id) {
        return ResponseEntity.ok(service.markInStock(id));
    }
}
