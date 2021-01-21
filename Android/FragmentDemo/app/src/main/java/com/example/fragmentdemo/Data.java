package com.example.fragmentdemo;

import androidx.annotation.NonNull;
import androidx.room.Entity;
import androidx.room.PrimaryKey;

@Entity(tableName = "data_table")
public class Data {

    @NonNull
    @PrimaryKey
    private String id;
    private String author;
    private int width;
    private int height;
    private String url;
    private String download_url;

    public Data() {
    }

    public Data(StreamData mData) {
        this.id = mData.getId();
        this.author = mData.getAuthor();
        this.width = mData.getWidth();
        this.height = mData.getHeight();
        this.url = mData.getUrl();
        this.download_url = mData.getDownload_url();
    }

    public Data(String id, String author, int width, int height, String url, String download_url) {
        this.id = id;
        this.author = author;
        this.width = width;
        this.height = height;
        this.url = url;
        this.download_url = download_url;
    }

    public String getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }

    public int getWidth() {
        return width;
    }

    public int getHeight() {
        return height;
    }

    public String getUrl() {
        return url;
    }

    public String getDownload_url() {
        return download_url;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setWidth(int width) {
        this.width = width;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setDownload_url(String download_url) {
        this.download_url = download_url;
    }
}
