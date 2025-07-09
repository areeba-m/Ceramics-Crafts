package com.claystore.store.service;

import com.claystore.commonsecurity.exception.MediaUploadException;
import com.claystore.commonsecurity.exception.ResourceNotFoundException;
import com.claystore.store.dto.CustomizedProductDTO;
import com.claystore.store.entity.CustomizedProduct;
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

    public List<CustomizedProductDTO> getAllCustomizedProducts(){
        return repository.findAll().stream()
                .map(this::convertToDTO)
                .toList();
    }

    public Optional<CustomizedProductDTO> getCustomizedProductById(int id){
        return repository.findById(id)
                .map(this::convertToDTO);
    }

    public CustomizedProductDTO saveCustomizedProduct(CustomizedProductDTO productDTO, MultipartFile image){
        try {
            if (image != null && !image.isEmpty()) {
                Map uploadResult = cloudinary.uploader().upload(
                        image.getBytes(),
                        ObjectUtils.emptyMap()
                );
                String imageUrl = (String) uploadResult.get("secure_url");
                String publicId = (String) uploadResult.get("public_id");
                productDTO.setReferenceImageUrl(imageUrl);
                productDTO.setCloudinaryPublicId(publicId);
            }

            CustomizedProduct customizedProduct = convertToEntity(productDTO);

            CustomizedProduct saved = repository.save(customizedProduct);
            return convertToDTO(saved);
        } catch (Exception e) {
            throw new MediaUploadException("Image upload failed: " + e.getMessage());
        }
    }

    private static CustomizedProduct convertToEntity(CustomizedProductDTO productDTO) {
        CustomizedProduct customizedProduct = new CustomizedProduct();
        customizedProduct.setShape(productDTO.getShape());
        customizedProduct.setColor(productDTO.getColor());
        customizedProduct.setTexture(productDTO.getTexture());
        customizedProduct.setSize(productDTO.getSize());
        customizedProduct.setReferenceImageUrl(productDTO.getReferenceImageUrl());
        customizedProduct.setSpecialFeature(productDTO.getSpecialFeature());
        customizedProduct.setInstruction(productDTO.getInstruction());
        customizedProduct.setEmail(productDTO.getEmail());
        customizedProduct.setCloudinaryPublicId(productDTO.getCloudinaryPublicId());
        return customizedProduct;
    }

    public void deleteCustomizedProduct(int id) {
        CustomizedProduct product = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customized Product not found"));

        try {
            if (product.getCloudinaryPublicId() != null) {
                cloudinary.uploader().destroy(product.getCloudinaryPublicId(), ObjectUtils.emptyMap());
            }
        } catch (Exception e) {
            throw new MediaUploadException("Failed to delete image from Cloudinary: " + e.getMessage());
        }

        repository.deleteById(id);
    }

    private CustomizedProductDTO convertToDTO(CustomizedProduct customizedProduct){
        return new CustomizedProductDTO(
                customizedProduct.getId(),
                customizedProduct.getShape(),
                customizedProduct.getColor(),
                customizedProduct.getTexture(),
                customizedProduct.getSize(),
                customizedProduct.getReferenceImageUrl(),
                customizedProduct.getSpecialFeature(),
                customizedProduct.getInstruction(),
                customizedProduct.getEmail(),
                customizedProduct.getCloudinaryPublicId()
        );
    }
}


