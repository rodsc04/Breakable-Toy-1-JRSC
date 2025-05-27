package com.bt1rs.bt_backend.service;

import com.bt1rs.bt_backend.model.Product;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

class ProductServiceTest {
    private ProductService service;

    @BeforeEach
    void setup() {
        service = new ProductService();
    }

    @Test
    void createProductStoresProduct() {
        Product p = new Product();
        p.setName("Widget");
        p.setCategory("Gadget");
        p.setPrice(BigDecimal.ONE);
        p.setExpirationDate(LocalDate.now());
        p.setQuantity(10);

        Product created = service.createProduct(p);
        assertEquals("Widget", created.getName());
    }

    @Test
    void markOutOfStockSetsQuantityToZero() {
        Product p = new Product();
        p.setName("Foo");
        p.setCategory("Bar");
        p.setPrice(BigDecimal.TEN);
        p.setExpirationDate(LocalDate.now());
        p.setQuantity(2);

        Product created = service.createProduct(p);
        service.markOutOfStock(created.getId());
        assertEquals(0, service.getAllProducts().get(0).getQuantity());
    }
}