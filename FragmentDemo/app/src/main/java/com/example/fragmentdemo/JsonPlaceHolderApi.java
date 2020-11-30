package com.example.fragmentdemo;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface JsonPlaceHolderApi {

    @GET("v2/list?page=2&limit=100")
    Call<List<StreamData>> getPosts();
}
