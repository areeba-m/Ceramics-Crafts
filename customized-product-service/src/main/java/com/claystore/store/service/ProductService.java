package com.claystore.store.service;

import com.claystore.store.entity.Product;
import com.claystore.store.repository.ProductRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repository;
    private final Cloudinary cloudinary;

    public ProductService(ProductRepository repository, Cloudinary cloudinary) {
        this.repository = repository; /*constructor injection*/
        this.cloudinary = cloudinary;
    }

    public List<Product> getAllProducts(){
        return repository.findAll();
    }

    public Optional<Product> getProductById(int id){
        return repository.findById(id);
    }

    public Product saveProduct(Product product, MultipartFile image){
        try {
            if (image != null && !image.isEmpty()) {
                String contentType = image.getContentType();
                if (!isImage(contentType)) {
                    throw new IllegalArgumentException("Only image files are allowed (JPEG, PNG, GIF, etc.)");
                }

                Map uploadResult = cloudinary.uploader().upload(
                        image.getBytes(),
                        ObjectUtils.emptyMap()
                );
                String imageUrl = (String) uploadResult.get("secure_url");
                String publicId = (String) uploadResult.get("public_id");
                product.setImageUrl(imageUrl);
                product.setCloudinaryPublicId(publicId);
            }

            return repository.save(product);
        } catch (Exception e) {
            throw new RuntimeException("Image upload failed: " + e.getMessage());
        }
    }

    public Product updateProduct(int id, Product newProduct, MultipartFile image) {
        Product existingProduct = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setName(newProduct.getName());
        existingProduct.setDescription(newProduct.getDescription());
        existingProduct.setMaterial(newProduct.getMaterial());
        existingProduct.setSize(newProduct.getSize());
        existingProduct.setPrice(newProduct.getPrice());

        // re-upload image if provided
        if (image != null && !image.isEmpty()) {
            String contentType = image.getContentType();
            if (!isImage(contentType)) {
                throw new IllegalArgumentException("Only image files are allowed (JPEG, PNG, GIF, etc.)");
            }

            try {
                Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
                String imageUrl = (String) uploadResult.get("secure_url");
                String publicId = (String) uploadResult.get("public_id");
                existingProduct.setImageUrl(imageUrl);
                existingProduct.setCloudinaryPublicId(publicId);
            } catch (Exception e) {
                throw new RuntimeException("Image upload failed: " + e.getMessage());
            }
        }

        return repository.save(existingProduct);
    }

    public void deleteProduct(int id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        // delete from cloudinary
        try {
            if (product.getCloudinaryPublicId() != null) {
                cloudinary.uploader().destroy(product.getCloudinaryPublicId(), ObjectUtils.emptyMap());
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete image from Cloudinary: " + e.getMessage());
        }

        repository.deleteById(id);
    }

    private boolean isImage(String contentType) {
        return contentType != null && (
                contentType.equals("image/jpeg") ||
                        contentType.equals("image/png") ||
                        contentType.equals("image/gif") ||
                        contentType.equals("image/webp") ||
                        contentType.equals("image/svg+xml")
        );
    }


}
