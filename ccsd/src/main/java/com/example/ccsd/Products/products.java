package com.example.ccsd.Products;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Base64;

@Document(collection = "products")
public class products {

    @Id
    String id;
    String title;
    String postSlug;
    String postShortDescription;
    String tag;
    String place;
    String date;
    String status;
    private byte[] imageStore;

    //Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPostSlug() {
        return postSlug;
    }

    public void setPostSlug(String postSlug) {
        this.postSlug = postSlug;
    }

    public String getPostShortDescription() {
        return postShortDescription;
    }

    public void setPostShortDescription(String postShortDescription) {
        this.postShortDescription = postShortDescription;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getDateProduct() {
        return date;
    }

    public void setDateProduct(String dateProduct) {
        this.date = dateProduct;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public byte[] getImageStore() {
        return imageStore;
    }

    public void setImageStore(byte[] imageStore) {
        this.imageStore = imageStore;
    }


    public Object getImageAsBase64() {

        return imageStore != null ? Base64.getEncoder().encodeToString(imageStore) : null;

    }

    public void setImageStore64String(Object ImageAsBase64) {
    this.imageStore = imageStore;
    }

    public String getDate() {
        return date;
    }
}