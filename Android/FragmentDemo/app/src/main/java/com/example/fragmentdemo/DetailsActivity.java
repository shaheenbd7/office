package com.example.fragmentdemo;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.FragmentManager;

import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class DetailsActivity extends AppCompatActivity {


    private static final String TAG = "DetailsActivity";

    Context context;

    FragmentManager fragmentManager;
    FragmentDetails fragmentDetails;

    FragmentBlur fragmentBlur;
    FragmentActual fragmentActual;
    FragmentGray fragmentGray;

    Button buttonGray;
    Button buttonBlur;

    String url     = "https://picsum.photos/id/0/300/400";
    String urlGray = "https://picsum.photos/id/0/300/400?grayscale";
    String urlBlur = "https://picsum.photos/id/0/300/400?blur";
    int id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_details);

        getIncomingIntent();

        Log.d(TAG, "onCreate: " + " Url  = " + url);
        Log.d(TAG, "onCreate: " + " BlurUrl  = " + urlBlur);
        Log.d(TAG, "onCreate: " + " GrayUrl  = " + urlGray);

        fragmentManager = getSupportFragmentManager();
        fragmentDetails = new FragmentDetails();

        fragmentActual = new FragmentActual(getApplicationContext(), url);
        fragmentBlur = new FragmentBlur(getApplicationContext(), urlBlur);
        fragmentGray = new FragmentGray(getApplicationContext(), urlGray);

        buttonGray = findViewById(R.id.details_gray_image);
        buttonBlur = findViewById(R.id.details_blur_image);

        changeFragment(3);

        buttonGray.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Goto Gray Fragment");
                changeFragment(1);
            }
        });

        buttonBlur.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Log.d(TAG, "onClick: Goto Blur Fragment");
                changeFragment(2);
            }
        });
    }

    private boolean changeFragment(int cmd) {
        switch (cmd) {
            case 1:
                fragmentManager.beginTransaction().add(R.id.details_fagments, fragmentGray,null).commit();
                return true;
            case 2:
                fragmentManager.beginTransaction().add(R.id.details_fagments, fragmentBlur,null).commit();
                return true;
            case 3:
                fragmentManager.beginTransaction().add(R.id.details_fagments, fragmentActual,null).commit();
                return true;
            default:
                return false;
        }
    }

    private void getIncomingIntent() {

        Log.d(TAG, "getIncomingIntent: checking for incoming intents");

        if ( getIntent().hasExtra("position") ) {
            Log.d(TAG, "getIncomingIntent: found intent extras");

            String position = getIntent().getStringExtra("position");
            int pos = Integer.parseInt(position);
            Log.d(TAG, "getIncomingIntent: " + pos);
            id = pos;

            url = "https://picsum.photos/id/" + id +"/0/300/200";
            urlBlur = "https://picsum.photos/id/" + id +"/300/400?grayscale";
            urlBlur = "https://picsum.photos/id/" + id +"/300/400?blur";
            Log.d(TAG, "getIncomingIntent: " + url);
        }
    }
}