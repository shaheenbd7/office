package com.example.backgroundservice;

import android.app.PendingIntent;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.util.Log;

import androidx.annotation.Nullable;

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

public class MyService extends Service {
    private static final String TAG = "MyService";

    public RequestQueue requestQueue;
    PendingIntent data;

    @Override
    public void onCreate() {
        super.onCreate();
        requestQueue = Volley.newRequestQueue(this);
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // do your task
        Log.d(TAG, "onStartCommand: ");
        data = intent.getParcelableExtra("pendingIntent");
        parseJson();
        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        stopSelf();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    public  void parseJson() {
        String url = "https://pixabay.com/api/?key=5303976-fd6581ad4ac165d1b75cc15b3&q=kitten&image_type=photo&pretty=true";
        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONArray jsonArray = response.getJSONArray("hits");
                            ArrayList<Item> mList = new ArrayList<>();
                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject hit = jsonArray.getJSONObject(i);
                                String creatorName = hit.getString("user");
                                String imageUrl = hit.getString("webformatURL");
//                                Item mItem = new Item(imageUrl, creatorName);
//                                mList.add(mItem);
//                                Log.d(TAG, "No "+i+" :C: "+mItem.getCreator());
//                                Log.d(TAG, "No "+i+" :U: "+mItem.getImageUrl());

                                Intent result = new Intent();
                                result.putExtra("name", creatorName);
                                result.putExtra("url", imageUrl);
                                data.send(MyService.this, 200, result);
                            }

//                            MainActivity.itemList.add(mItem);
//                            MainActivity.update();

//                            Intent result = new Intent();
//                            result.putExtra("name", mList.get(0).getCreator());
//
//                            data.send(MyService.this, 200, result);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        } catch (PendingIntent.CanceledException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        });
        requestQueue.add(request);
    }
}
