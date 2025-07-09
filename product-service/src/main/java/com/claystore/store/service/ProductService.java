package com.claystore.store.service;

import com.claystore.commonsecurity.exception.InvalidMediaUploadException;
import com.claystore.commonsecurity.exception.MediaUploadException;
import com.claystore.commonsecurity.exception.ResourceNotFoundException;
import com.claystore.store.dto.ProductDTO;
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

    public List<ProductDTO> getAllProducts(){
        return repository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public Optional<ProductDTO> getProductById(int id){
        return repository.findById(id)
                .map(this::convertToDTO);
    }

    public ProductDTO saveProduct(ProductDTO productDTO, MultipartFile image){
        try {
            if (image != null && !image.isEmpty()) {
                String contentType = image.getContentType();
                if (!isImage(contentType)) {
                    throw new InvalidMediaUploadException("Only image files are allowed (JPEG, PNG, GIF, etc.)");
                }

                Map uploadResult = cloudinary.uploader().upload(
                        image.getBytes(),
                        ObjectUtils.emptyMap()
                );
                String imageUrl = (String) uploadResult.get("secure_url");
                String publicId = (String) uploadResult.get("public_id");
                productDTO.setImageUrl(imageUrl);
                productDTO.setCloudinaryPublicId(publicId);
            }

            Product product = new Product();
            product.setName(productDTO.getName());
            product.setDescription(productDTO.getDescription());
            product.setMaterial(productDTO.getMaterial());
            product.setSize(productDTO.getSize());
            product.setPrice(productDTO.getPrice());
            product.setImageUrl(productDTO.getImageUrl());
            product.setCloudinaryPublicId(productDTO.getCloudinaryPublicId());

            Product saved = repository.save(product);
            return convertToDTO(saved);

        } catch (Exception e) {
            throw new MediaUploadException("Image upload failed: " + e.getMessage());
        }
    }

    public ProductDTO updateProduct(int id, ProductDTO newProduct, MultipartFile image) {
        Product existingProduct = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        existingProduct.setName(newProduct.getName());
        existingProduct.setDescription(newProduct.getDescription());
        existingProduct.setMaterial(newProduct.getMaterial());
        existingProduct.setSize(newProduct.getSize());
        existingProduct.setPrice(newProduct.getPrice());

        // re-upload image if provided
        if (image != null && !image.isEmpty()) {
            String contentType = image.getContentType();
            if (!isImage(contentType)) {
                throw new InvalidMediaUploadException("Only image files are allowed (JPEG, PNG, GIF, etc.)");
            }

            try {
                Map uploadResult = cloudinary.uploader().upload(image.getBytes(), ObjectUtils.emptyMap());
                String imageUrl = (String) uploadResult.get("secure_url");
                String publicId = (String) uploadResult.get("public_id");
                existingProduct.setImageUrl(imageUrl);
                existingProduct.setCloudinaryPublicId(publicId);
            } catch (Exception e) {
                throw new MediaUploadException("Image upload failed: " + e.getMessage());
            }
        }

        Product updatedProduct = repository.save(existingProduct);
        return convertToDTO(updatedProduct);
    }

    public void deleteProduct(int id) {
        Product product = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // delete from cloudinary
        try {
            if (product.getCloudinaryPublicId() != null) {
                cloudinary.uploader().destroy(product.getCloudinaryPublicId(), ObjectUtils.emptyMap());
            }
        } catch (Exception e) {
            throw new MediaUploadException("Failed to delete image from Cloudinary: " + e.getMessage());
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

    private ProductDTO convertToDTO(Product product){
        return new ProductDTO(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getMaterial(),
                product.getSize(),
                product.getPrice(),
                product.getImageUrl(),
                product.getCloudinaryPublicId()
        );
    }

}
