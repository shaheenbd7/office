package com.example.alarm;

public class ExampleItem {

    private int mImageResource;
    private String title;
    private String description;

    public ExampleItem(int mImageResource, String title, String description) {
        this.mImageResource = mImageResource;
        this.title = title;
        this.description = description;
    }

    public int getmImageResource() {
        return mImageResource;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
