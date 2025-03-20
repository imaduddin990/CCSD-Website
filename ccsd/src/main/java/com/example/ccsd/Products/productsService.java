package com.example.ccsd.Products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class productsService {

    @Autowired
    private productsRepository productRepository;

    // Fetch all products
    public List<products> getAllProducts() {
        return productRepository.findAll();
    }

    // Fetch a product by its ID
    public Optional<products> getProductsById(String id) {
        return productRepository.findById(id);
    }

    // Add a new product
    public products addProducts(products product) {
        return productRepository.save(product);
    }

    // Update an existing product by ID
    public products updateProducts(String id, products productDetails) {
        return productRepository.findById(id).map(existingProduct -> {
            existingProduct.setTitle(productDetails.getTitle());
            existingProduct.setPostSlug(productDetails.getPostSlug());
            existingProduct.setPostShortDescription(productDetails.getPostShortDescription());
            existingProduct.setTag(productDetails.getTag());
            existingProduct.setPlace(productDetails.getPlace());
            existingProduct.setDateProduct(productDetails.getDate());
            existingProduct.setStatus(productDetails.getStatus());
            existingProduct.setImageStore(productDetails.getImageStore());
            return productRepository.save(existingProduct);
        }).orElse(null); // No product found, return null
    }

    // Delete a product by ID
    public void deleteProducts(String id) {
        productRepository.deleteById(id);
    }
}