package com.example.sensors;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;

import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity implements SensorEventListener {

    private static final String TAG = "MainActivity";
    private SensorManager sensorManager;
    Sensor accelerometer, mGyro, mMagno, mLight, mPresure, mTemp, mHumi;

    // Accelerometer
    TextView xValue, yValue, zValue;
    // Gyro
    TextView xGyroValue, yGyroValue, zGyroValue;
    // Magnetometer
    TextView xMag,yMag;
    // Others
    TextView light;
    TextView pressure;
    TextView humidity;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Log.d(TAG, "onCreate: Initializing Sensor Service");
        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        sensorManager.registerListener(MainActivity.this, accelerometer, SensorManager.SENSOR_DELAY_NORMAL);
        Log.d(TAG, "onCreate: Registered accelerometer listener");

        // Initialize Views
        xValue = (TextView)findViewById(R.id.x_value);
        yValue = (TextView)findViewById(R.id.y_value);
        zValue = (TextView)findViewById(R.id.z_value);
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        Log.d(TAG, "onSensorChanged: ");
        Log.d(TAG, "X: " + sensorEvent.values[0]);
        Log.d(TAG, "Y: " + sensorEvent.values[1]);
        Log.d(TAG, "Z: " + sensorEvent.values[2]);

        xValue.setText("X = " + sensorEvent.values[0]);
        yValue.setText("Y = " + sensorEvent.values[1]);
        zValue.setText("Z = " + sensorEvent.values[2]);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {
        Log.d(TAG, "onAccuracyChanged: ");

    }
}