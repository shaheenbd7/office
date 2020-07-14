package com.example.testone;

import android.os.Bundle;
import android.support.wearable.activity.WearableActivity;
import android.util.Log;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.testone.Retrofit.ApiClient;
import com.example.testone.Retrofit.ApiInterface;
import com.example.testone.Retrofit.Example;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends WearableActivity {

    private TextView mTextView;
    private TextView mTextViewTemperature;
    private TextView mTextViewWindSpeed;
    private TextView mTextViewWeatherComment;
    Animation rotateAnimation;
    ImageView mImageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mTextView = (TextView) findViewById(R.id.location);
        mImageView = (ImageView) findViewById(R.id.image_today);
        mTextViewTemperature = (TextView) findViewById(R.id.textTemperature);
        mTextViewWindSpeed = (TextView) findViewById(R.id.windSpeed);
        mTextViewWeatherComment = (TextView) findViewById(R.id.weatherComment);

        // Enables Always-on
        setAmbientEnabled();

        // set Location
        setLocation();

        // set Temperature
        setTemperature();

        // set WindSpeed
        setWindSpeed();

        // set weather Comment
        setWeatherComment();

        // Rotation Animation
        rotateImage();

        getWeatherData("Dhaka");
    }

    private void getWeatherData(String name){

        ApiInterface apiInterface = ApiClient.getClient().create(ApiInterface.class);

        Call<Example> call = apiInterface.getWeatherData(name);

        call.enqueue(new Callback<Example>() {
            @Override
            public void onResponse(Call<Example> call, Response<Example> response) {

                Log.d("Data: ",response.body().getMain().getTemp()+" C" );
                Log.d("Data: ",response.body().getMain().getFeels_like()+" C" );
                Log.d("Data: ",response.body().getMain().getHumidity() +" C" );

//                tempText.setText("Temp"+" "+response.body().getMain().getTemp()+" C");
//                descText.setText("Feels Like"+" "+response.body().getMain().getFeels_like());
//                humidityText.setText("Humidity"+" "+response.body().getMain().getHumidity());


            }

            @Override
            public void onFailure(Call<Example> call, Throwable t) {

            }
        });

    }


    private void setWeatherComment() {
        mTextViewWeatherComment.setText("Sky is Clear");
    }

    private void setTemperature() {

        mTextViewTemperature.setText("35°");
    }

    private void setLocation() {
        mTextView.setText("Dhaka");
    }

    private void setWindSpeed() {
        mTextViewWindSpeed.setText("100 m/s");
    }

    private void rotateImage() {
        rotateAnimation= AnimationUtils.loadAnimation(this, R.anim.rotate);
        mImageView.startAnimation(rotateAnimation);
    }

    @Override
    protected void onStart() {
        super.onStart();
    }
}
