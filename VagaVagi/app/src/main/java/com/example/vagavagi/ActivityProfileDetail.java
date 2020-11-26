package com.example.vagavagi;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

public class ActivityProfileDetail extends AppCompatActivity {

    private static final String TAG = "shan";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile_detail);

        getIncomingIntent();
    }

    private void getIncomingIntent() {
        Log.d(TAG, "getIncomingIntent: checking for incoming intents");

        if ( getIntent().hasExtra("position") ) {
            Log.d(TAG, "getIncomingIntent: ");

            String position = getIntent().getStringExtra("position");

            TextView mText = findViewById(R.id.text_view_profile_details);
            mText.setText(position);
        }
    }
}