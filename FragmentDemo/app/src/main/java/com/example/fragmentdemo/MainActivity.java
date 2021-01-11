package com.example.fragmentdemo;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;
import android.util.Log;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity: Shaheen: ";
    
    RecyclerView recyclerView;
    MyAdapter myAdapter;
    ArrayList<Data> dataArrayList;
    DataViewModel mViewModel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        dataArrayList = new ArrayList<>();

       // setRecyclerView();

//        mViewModel = ViewModelProviders.of(this).get(DataViewModel.class);
//
//        mViewModel.getAllData().observe(this, new Observer<List<Data>>() {
//            @Override
//            public void onChanged(@Nullable List<Data> allData) {
//                myAdapter.setData(allData);
//            }
//        });

        // downloadData();
        startThread();


        //prepareDummyData();
        setRecyclerView();
        //setViewModel();
    }


    void prepareDummyData() {
        Data d = new Data("0",
                "Nadir Balcikli",
                3264,
                2176,
                "https://unsplash.com/photos/wE9nUW7tMmk",
                "https://picsum.photos/id/119/3264/2176");

        dataArrayList.add(d);
        dataArrayList.add(d);
        dataArrayList.add(d);
        dataArrayList.add(d);
        dataArrayList.add(d);
        dataArrayList.add(d);
    }

    public void startThread() {
        ExampleThread thread = new ExampleThread();
        thread.start();
    }

    class ExampleThread extends Thread {

        ExampleThread() {
        }

        @Override
        public void run() {
            downloadData();
        }
    }


    public void setRecyclerView() {
        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setHasFixedSize(true);
        // set layout as LinerLayout
        recyclerView.setLayoutManager( new LinearLayoutManager(this));
        myAdapter = new MyAdapter(this, dataArrayList);
        recyclerView.setAdapter( myAdapter  );

        //myAdapter.setData(dataArrayList);
        setViewModel();
    }

    public void setViewModel() {
        mViewModel = ViewModelProviders.of(this).get(DataViewModel.class);
        mViewModel.getAllData().observe(this, new Observer<List<Data>>() {
            @Override
            public void onChanged(@Nullable List<Data> allData) {
                myAdapter.setData(allData);
            }
        });
    }

    public void downloadData() {

        Retrofit retrofit = new Retrofit.Builder()
                .baseUrl("https://picsum.photos/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
        
        JsonPlaceHolderApi jsonPlaceHolderApi = retrofit.create(JsonPlaceHolderApi.class);
        Call<List<StreamData>> call = jsonPlaceHolderApi.getData();
        call.enqueue(new Callback<List<StreamData>>() {
            @Override
            public void onResponse(Call<List<StreamData>> call, Response<List<StreamData>> response) {
                if (!response.isSuccessful()) {
                    // textView.setText("Code: " + response.code());
                    Log.d(TAG, "onResponse: " + "ERROR! ");
                    return;
                }
                List<StreamData> dataList = response.body();
                ArrayList<Data> temArray = new ArrayList<>();

                for (StreamData data : dataList) {

                    Log.d(TAG, "ID: " + data.getId());
                    Log.d(TAG, "Author: " + data.getAuthor());
                    Log.d(TAG, "Height-Width " + data.getHeight() + "-" + data.getWidth());

                    Data cellData = new Data(data);
                    temArray.add(cellData);

                    //dataArrayList.add(cellData);
                    //mViewModel.insert(cellData);
                }
                //myAdapter.setData(temArray);
                dataArrayList = temArray;
                myAdapter.setData(dataArrayList);
                //setRecyclerView();
            }

            @Override
            public void onFailure(Call<List<StreamData>> call, Throwable t) {
                Log.d(TAG, "onFailure: " + "Error !!!");
            }

        });
    }
}