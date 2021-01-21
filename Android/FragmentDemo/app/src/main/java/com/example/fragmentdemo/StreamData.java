package com.example.fragmentdemo;

public class StreamData {
    private String id;
    private String author;
    private int width;
    private int height;
    private String url;
    private String download_url;

    public StreamData(String id, String author, int width, int height, String url, String download_url) {
        this.id = id;
        this.author = author;
        this.width = width;
        this.height = height;
        this.url = url;
        this.download_url = download_url;
    }

    public StreamData() {
        this.id = "";
        this.author = "";
        this.width = 0;
        this.height = 0;
        this.url = "";
        this.download_url = "";
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
}
