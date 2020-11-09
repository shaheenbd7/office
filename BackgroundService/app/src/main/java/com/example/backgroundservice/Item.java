package com.example.backgroundservice;

public class Item {
    private String imageUrl;
    private String creator;

    public Item(String imageUrl, String creator) {
        this.imageUrl = imageUrl;
        this.creator = creator;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getCreator() {
        return creator;
    }
}
