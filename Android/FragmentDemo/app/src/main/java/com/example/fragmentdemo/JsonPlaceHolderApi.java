package com.example.fragmentdemo;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;

public interface JsonPlaceHolderApi {

    @GET("v2/list?page=1&limit=100")
    Call<List<StreamData>> getData();
}
