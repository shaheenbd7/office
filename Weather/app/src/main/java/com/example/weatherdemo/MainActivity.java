package com.example.weatherdemo;

import android.os.Bundle;
import android.support.wearable.activity.WearableActivity;
import android.util.Log;
import android.view.View;
import android.widget.TextView;

import com.airbnb.lottie.LottieAnimationView;

import retrofit.ApiClient;
import retrofit.ApiInterface;
import retrofit.Daily;
import retrofit.Data;
import retrofit.Today;
import retrofit.WeatherData;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class MainActivity extends WearableActivity {

    private static final String TAG = "Demo";
    // Data
    Today today;
    Daily[] dailyData;

    // UI
    TextView location;
    TextView todayTemp;
    TextView todayWindSpeed;
    TextView description;
    LottieAnimationView[] mAV = new LottieAnimationView[5];
    TextView[] days = new TextView[6];
    TextView[] temps = new TextView[6];
    TextView[] rains = new TextView[6];
    TextView[] winds = new TextView[6];

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Enables Always-on
        setAmbientEnabled();

        // iniatialize UI Component
        iniatializeUI();

        // getWeather Data
         getWeatherData();

         // set Data to UI
        //showData();
    }

    void iniatializeUI() {
        // initialize Today
        initializeUIToday();
        initializeUIForecast();
    }

    void initializeUIToday() {
        // Animation View
        mAV[0] = (LottieAnimationView) findViewById(R.id.animationView1);
        mAV[1] = (LottieAnimationView) findViewById(R.id.animationView2);
        mAV[2] = (LottieAnimationView) findViewById(R.id.animationView3);
        mAV[3] = (LottieAnimationView) findViewById(R.id.animationView4);
        mAV[4] = (LottieAnimationView) findViewById(R.id.animationView5);

        // location
        location = (TextView) findViewById(R.id.location);
        // today Data
        todayTemp = (TextView) findViewById(R.id.todayTemp);
        todayWindSpeed = (TextView) findViewById(R.id.todayWindSpeed);
        //Description
        description = (TextView) findViewById(R.id.description);
    }

    void initializeUIForecast() {

        days[0] = (TextView) findViewById(R.id.day1);
        days[1] = (TextView) findViewById(R.id.day2);
        days[2] = (TextView) findViewById(R.id.day3);
        days[3] = (TextView) findViewById(R.id.day4);
        days[4] = (TextView) findViewById(R.id.day5);
        days[5] = (TextView) findViewById(R.id.day6);

        temps[0] = (TextView) findViewById(R.id.temp1);
        temps[1] = (TextView) findViewById(R.id.temp2);
        temps[2] = (TextView) findViewById(R.id.temp3);
        temps[3] = (TextView) findViewById(R.id.temp4);
        temps[4] = (TextView) findViewById(R.id.temp5);
        temps[5] = (TextView) findViewById(R.id.temp6);

        rains[0] = (TextView) findViewById(R.id.rain1);
        rains[1] = (TextView) findViewById(R.id.rain2);
        rains[2] = (TextView) findViewById(R.id.rain3);
        rains[3] = (TextView) findViewById(R.id.rain4);
        rains[4] = (TextView) findViewById(R.id.rain5);
        rains[5] = (TextView) findViewById(R.id.rain6);

        winds[0] = (TextView) findViewById(R.id.wind1);
        winds[1] = (TextView) findViewById(R.id.wind2);
        winds[2] = (TextView) findViewById(R.id.wind3);
        winds[3] = (TextView) findViewById(R.id.wind4);
        winds[4] = (TextView) findViewById(R.id.wind5);
        winds[5] = (TextView) findViewById(R.id.wind6);
    }

    void showData() {
        Log.d(TAG, "showData: ");

        if(dailyData==null) {
            Log.d(TAG, "showData: No Daily Data");
            return;
        }
        
        if(today==null) {
            Log.d(TAG, "showData: No Current Data");
            return;
        }

        Log.d(TAG, "showData: Set Data");

        todayTemp.setText( today.getTemp()+"°c" );
        todayWindSpeed.setText( today.getWindSpeed()+" m/s" );

        //return;
//
        WeatherData[] weather = today.getWeatherData();
        String weatherCondition = weather[0].getMain();

        description.setText(weather[0].getDescription());

        for(int i=0;i<5;i++) {
            mAV[i].setVisibility(View.GONE);
        }

        switch (weatherCondition) {
            case "Clear":
                mAV[0].setVisibility(View.VISIBLE);
                break;
            case "Clouds":
                mAV[1].setVisibility(View.VISIBLE);
                break;
            case "Rain":
                mAV[2].setVisibility(View.VISIBLE);
                break;
            case "Snow":
                mAV[3].setVisibility(View.VISIBLE);
                break;
            default:
                mAV[4].setVisibility(View.VISIBLE);
        }

        // ForCast Data
        for(int i=0;i<6;i++) {
              int tem = getValue(dailyData[i+1].getTemp().getMax());
              temps[i].setText( tem + "°c" );
              winds[i].setText( dailyData[i+1].getWind_speed() + " m/s" );
              rains[i].setText( dailyData[i+1].getRain() + " mm" );
        }
    }

    int getValue(String t) {
        double tt = Double.parseDouble(t);
        int tem = (int) Math.round(tt);
        return tem;
    }



    private void getWeatherData(){

        Log.d(TAG, "getWeatherData: ");

        ApiInterface apiInterface = ApiClient.getClient().create(ApiInterface.class);

        Call<Data> call = apiInterface.getWeatherData();

        Log.d(TAG, "getWeatherData: "+call.request().url());

        call.enqueue(new Callback<Data>() {

            @Override
            public void onResponse(Call<Data> call, Response<Data> response) {
                Log.d(TAG, "onResponse: Success");
                Log.d(TAG, "onResponse: "+response);

                if(response.body()==null) {
                    Log.d(TAG, "onResponse: Response is Null.");
                } else {
                    Log.d(TAG, "onResponse: Have Data");
                    today = response.body().getTodayData();
                    dailyData = response.body().getDailyData();
                    showData();
                }

                // Debug
//                WeatherData []tem = response.body().getTodayData().getWeatherData();
//                Daily[] dailyData = response.body().getDailyData();
//
//                if(tem.length > 0)  {
//                    Log.d(TAG,tem[0].getMain() +" ::" );
//                    Log.d(TAG,tem[0].getDescription() +" ::" );
//                }
//
//
//                Log.d(TAG, "onResponse: Size: "+dailyData.length);
//
//                if(dailyData.length>0) {
//                    int size = dailyData.length;
//                    for(int i=0;i<size;i++) {
//                        Log.d(TAG, "onResponse: Max = " + dailyData[i].getTemp().getMax() );
//                        Log.d(TAG, "onResponse: Min = " + dailyData[i].getTemp().getMin() );
//                        Log.d(TAG, "onResponse: Wind Speed = " + dailyData[i].getWind_speed() );
//                        Log.d(TAG, "onResponse: Rain = " + dailyData[i].getRain() );
//                    }
//                }
            }

            @Override
            public void onFailure(Call<Data> call, Throwable t) {
                Log.d(TAG, "onFailure: couldn't fetch Data");
            }
        });
    }
}
