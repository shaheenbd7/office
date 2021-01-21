package com.example.demofragment;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.os.Bundle;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    RecyclerView mRecylerView;
    ArrayList<Data> allData =new ArrayList<Data>();
    MyAdapter myAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        prepareDummyData();
        buildRecyleView();
    }

    void prepareDummyData() {
        Data d = new  Data("0", "S M SHAHEEN SHA", 3264, 2176, "https://unsplash.com/photos/wE9nUW7tMmk", "https://picsum.photos/id/119/3264/2176");
        allData.add(d);
        allData.add(d);
        allData.add(d);
        allData.add(d);
        allData.add(d);
    }

    public void buildRecyleView() {
        // Recycler view
        mRecylerView = findViewById(R.id.recycler_view);
        mRecylerView.setHasFixedSize(true);
        // set layout as LinerLayout
        mRecylerView.setLayoutManager( new LinearLayoutManager(this));
        myAdapter = new MyAdapter(this, allData);
        mRecylerView.setAdapter( myAdapter  );
    }
}