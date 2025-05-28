package com.bt1rs.bt_backend.service;

import com.bt1rs.bt_backend.model.Product;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ProductService {

    private final Map<Long, Product> products = new ConcurrentHashMap<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public List<Product> getAllProducts() {
        return new ArrayList<>(products.values());
    }

    public Product createProduct(Product request) {
        Product product = new Product();
        product.setId(idCounter.getAndIncrement());
        product.setName(request.getName());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setExpirationDate(request.getExpirationDate());
        product.setQuantity(request.getQuantity());
        LocalDateTime now = LocalDateTime.now();
        product.setCreateDate(now);
        product.setUpdateDate(now);

        products.put(product.getId(), product);
        return product;
    }

    public Product updateProduct(Long id, Product request) {
        Product product = products.get(id);
        if (product == null) throw new NoSuchElementException("Product not found");
        product.setName(request.getName());
        product.setCategory(request.getCategory());
        product.setPrice(request.getPrice());
        product.setExpirationDate(request.getExpirationDate());
        product.setQuantity(request.getQuantity());
        product.setUpdateDate(LocalDateTime.now());
        return product;
    }

    public void deleteProduct(Long id) {
        Product product = products.get(id);
        if (product == null) throw new NoSuchElementException("Product not found");
        products.remove(id);
    }

    public Product markOutOfStock(Long id) {
        Product product = products.get(id);
        if (product == null) throw new NoSuchElementException("Product not found");
        product.setQuantity(0);
        product.setUpdateDate(LocalDateTime.now());
        return product;
    }

    public Product markInStock(Long id) {
        Product product = products.get(id);
        if (product == null) throw new NoSuchElementException("Product not found");
        product.setQuantity(10);
        product.setUpdateDate(LocalDateTime.now());
        return product;
    }
}


