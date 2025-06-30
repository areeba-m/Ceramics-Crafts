package com.claystore.store.service;

import com.claystore.store.entity.CustomizedProduct;
import com.claystore.store.entity.Product;
import com.claystore.store.repository.CustomizedProductRepository;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class CustomizedProductService {

    private final CustomizedProductRepository repository;
    private final Cloudinary cloudinary;

    public CustomizedProductService(CustomizedProductRepository repository, Cloudinary cloudinary) {
        this.repository = repository;
        this.cloudinary = cloudinary;
    }

    public List<CustomizedProduct> getAllCustomizedProducts(){
        return repository.findAll();
    }

    public Optional<CustomizedProduct> getCustomizedProductById(int id){
        return repository.findById(id);
    }

    public CustomizedProduct saveCustomizedProduct(CustomizedProduct product, MultipartFile image){
        try {
            if (image != null && !image.isEmpty()) {
                Map uploadResult = cloudinary.uploader().upload(
                        image.getBytes(),
                        ObjectUtils.emptyMap()
                );
                String imageUrl = (String) uploadResult.get("secure_url");
                String publicId = (String) uploadResult.get("public_id");
                product.setReferenceImageUrl(imageUrl);
                product.setCloudinaryPublicId(publicId);
            }

            return repository.save(product);
        } catch (Exception e) {
            throw new RuntimeException("Image upload failed: " + e.getMessage());
        }
    }

    public void deleteCustomizedProduct(int id) {
        CustomizedProduct product = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customized Product not found"));

        try {
            if (product.getCloudinaryPublicId() != null) {
                cloudinary.uploader().destroy(product.getCloudinaryPublicId(), ObjectUtils.emptyMap());
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete image from Cloudinary: " + e.getMessage());
        }

        repository.deleteById(id);
    }
}


