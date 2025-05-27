package com.bt1rs.bt_backend.controller;

import com.bt1rs.bt_backend.model.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;

import java.math.BigDecimal;
import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class ProductControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void createProductAndGetProducts() {
        // Arrange
        Product req = new Product();
        req.setName("SimpleProduct");
        req.setCategory("SimpleCat");
        req.setPrice(BigDecimal.valueOf(10.25));
        req.setExpirationDate(LocalDate.of(2030, 1, 1));
        req.setQuantity(4);

        // Act
        ResponseEntity<Product> createResp = restTemplate.postForEntity("/products", req, Product.class);

        // Assert
        assertEquals(HttpStatus.OK, createResp.getStatusCode());
        Product created = createResp.getBody();
        assertNotNull(created);
        assertEquals("SimpleProduct", created.getName());

        // Get all products and check at least one exists
        ResponseEntity<Product[]> getResp = restTemplate.getForEntity("/products", Product[].class);
        assertEquals(HttpStatus.OK, getResp.getStatusCode());
        assertTrue(getResp.getBody().length > 0);
    }

    @Test
    void markOutOfStockEndpoint() {
        // Arrange: create a product
        Product req = new Product();
        req.setName("OutOfStockTest");
        req.setCategory("Test");
        req.setPrice(BigDecimal.valueOf(1.11));
        req.setExpirationDate(LocalDate.of(2032, 2, 2));
        req.setQuantity(3);

        Product created = restTemplate.postForObject("/products", req, Product.class);
        assertNotNull(created);

        // Act: Mark as out of stock
        ResponseEntity<Product> resp = restTemplate.postForEntity("/products/" + created.getId() + "/outofstock", null, Product.class);

        // Assert
        assertEquals(HttpStatus.OK, resp.getStatusCode());
        assertEquals(0, resp.getBody().getQuantity());
    }
}