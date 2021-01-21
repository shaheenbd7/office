package com.example.backgroundservice;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.Bundle;
import android.os.IBinder;
import android.os.Trace;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    private RecyclerView recyclerView;
    public static  Adapter adapter;
    public  ArrayList<Item> itemList;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setHasFixedSize(true);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        itemList = new ArrayList<>();
        adapter = new Adapter(  MainActivity.this, itemList);
        recyclerView.setAdapter(adapter);

        callService();
    }

    void callService() {
        PendingIntent pendingResult = createPendingResult(100, new Intent(), 0);
        Intent intent = new Intent(this, MyService.class);
        intent.putExtra("pendingIntent", pendingResult);
        startService(intent);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {

        if(requestCode==100 && resultCode==200) {

            Log.d(TAG, "onActivityResult: " + data.getStringExtra("name"));

            String authorName = data.getStringExtra("name");
            String url = data.getStringExtra("url");
            Item item = new Item(url,authorName);
            itemList.add(item);
            update();
        }

        super.onActivityResult(requestCode, resultCode, data);
    }

    public void update() {
        Log.d(TAG, "update: " + itemList.size());
        adapter.notifyDataSetChanged();
    }
}