package com.bt1rs.bt_backend.seeder;

import com.bt1rs.bt_backend.model.Product;
import com.bt1rs.bt_backend.service.ProductService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.Random;

@Component
public class ProductSeeder implements CommandLineRunner {

    private final ProductService productService;
    private final Random random = new Random();

    public ProductSeeder(ProductService productService) {
        this.productService = productService;
    }

    @Override
    public void run(String... args) {
        String[] sampleCategories = {"Food", "Drink", "Clothing", "Electronics", "Other"};
        for (int i = 1; i <= 10; i++) {
            Product p = new Product();
            p.setName ("Product " + i);
            p.setCategory(sampleCategories[random.nextInt(sampleCategories.length)]);
            p.setPrice(BigDecimal.valueOf(5 + (500 - 5) * random.nextDouble()).setScale(2, RoundingMode.HALF_UP));
            p.setExpirationDate(LocalDate.now().plusDays(random.nextInt(365)));
            p.setQuantity(random.nextInt(100));
            productService.createProduct(p);
        }
    }
}
