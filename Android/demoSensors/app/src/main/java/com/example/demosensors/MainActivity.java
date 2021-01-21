package com.example.demosensors;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.support.wearable.activity.WearableActivity;
import android.util.Log;
import android.widget.TextView;

public class MainActivity extends WearableActivity implements SensorEventListener {

    private static final String TAG = "MainActivity";

    private SensorManager sensorManager;
    Sensor accelerometer, mGyro, mMagno, mLight, mPresure, mTemp, mHumi, mProxi;


    Sensor heartRate;

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
    TextView temperature;
    TextView proximity;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Enables Always-on
        setAmbientEnabled();

        init();

        // Sensor Service
        Log.d(TAG, "onCreate: Initializing Sensor Service");
        sensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);

        accelerometer = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        if(accelerometer!=null) {
            sensorManager.registerListener(MainActivity.this, accelerometer, SensorManager.SENSOR_DELAY_NORMAL);
            Log.d(TAG, "onCreate: Registered accelerometer listener");
        } else {
            Log.d(TAG, "onCreate: accelerometer not supported");
        }

        mGyro = sensorManager.getDefaultSensor(Sensor.TYPE_GYROSCOPE);
        if(mGyro!=null) {
            sensorManager.registerListener(MainActivity.this, mGyro, SensorManager.SENSOR_DELAY_NORMAL);
            Log.d(TAG, "onCreate: Registered gyroScope listener");
        } else {
            Log.d(TAG, "onCreate: gyroScope not supported");
        }

        mMagno = sensorManager.getDefaultSensor(Sensor.TYPE_MAGNETIC_FIELD);
        if(mMagno!=null) {
            sensorManager.registerListener(MainActivity.this, mMagno, SensorManager.SENSOR_DELAY_NORMAL);
            Log.d(TAG, "onCreate: Registered Magnetometer listener");
        } else {
            Log.d(TAG, "onCreate: Magnetometer not supported");
        }

        mLight = sensorManager.getDefaultSensor(Sensor.TYPE_LIGHT);
        if(mLight!=null) {
            sensorManager.registerListener(MainActivity.this, mLight, SensorManager.SENSOR_DELAY_NORMAL);
            Log.d(TAG, "onCreate: Registered Light listener");
        } else {
            Log.d(TAG, "onCreate: Light not supported");
        }

        mPresure = sensorManager.getDefaultSensor(Sensor.TYPE_PRESSURE);
        if(mPresure!=null) {
            sensorManager.registerListener(MainActivity.this, mPresure, SensorManager.SENSOR_DELAY_NORMAL);
            Log.d(TAG, "onCreate: Registered Pressure listener");
        } else {
            Log.d(TAG, "onCreate: Pressure not supported");
        }

        mTemp = sensorManager.getDefaultSensor(Sensor.TYPE_AMBIENT_TEMPERATURE);
        if(mTemp!=null) {
            sensorManager.registerListener(MainActivity.this, mTemp, SensorManager.SENSOR_DELAY_NORMAL);
            Log.d(TAG, "onCreate: Registered Temperature listener");
        } else {
            Log.d(TAG, "onCreate: Pressure not supported");
        }

        mHumi = sensorManager.getDefaultSensor(Sensor.TYPE_RELATIVE_HUMIDITY);
        if(mHumi!=null) {
            sensorManager.registerListener(MainActivity.this, mHumi, SensorManager.SENSOR_DELAY_NORMAL);
            Log.d(TAG, "onCreate: Registered humidity listener");
        } else {
            Log.d(TAG, "onCreate: Humidity not supported");
        }

        mProxi = sensorManager.getDefaultSensor(Sensor.TYPE_PROXIMITY);
        if(mProxi!=null) {
            sensorManager.registerListener(MainActivity.this, mProxi, SensorManager.SENSOR_DELAY_NORMAL);
            Log.d(TAG, "onCreate: Registered Proximity listener");
        } else {
            Log.d(TAG, "onCreate: Proximity not supported");
        }

        heartRate = sensorManager.getDefaultSensor(Sensor.TYPE_HEART_BEAT);

    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        Log.d(TAG, "onSensorChanged: ");

        Sensor sensor = sensorEvent.sensor;

        if (sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
            // accelerometer
            xValue.setText("X = " + sensorEvent.values[0]);
            yValue.setText("Y = " + sensorEvent.values[1]);
            zValue.setText("Z = " + sensorEvent.values[2]);
        } else if (sensor.getType() == Sensor.TYPE_GYROSCOPE) {
            // gyroscope
            xGyroValue.setText("X = " + sensorEvent.values[0]);
            yGyroValue.setText("Y = " + sensorEvent.values[1]);
            zGyroValue.setText("Z = " + sensorEvent.values[2]);
        } else if (sensor.getType() == Sensor.TYPE_MAGNETIC_FIELD) {
           // magnetometer
            xMag.setText("X = "+sensorEvent.values[0]);
            yMag.setText("Y = "+sensorEvent.values[1]);
        } else if (sensor.getType() == Sensor.TYPE_LIGHT) {
            light.setText("Light: "+sensorEvent.values[0]);
        } else if (sensor.getType() == Sensor.TYPE_PRESSURE) {
            pressure.setText("Pressure: "+sensorEvent.values[0]);
        } else if (sensor.getType() == Sensor.TYPE_RELATIVE_HUMIDITY) {
            humidity.setText("Humidity: "+sensorEvent.values[0]);
        } else if (sensor.getType() == Sensor.TYPE_AMBIENT_TEMPERATURE) {
            temperature.setText("Temp: "+sensorEvent.values[0]);
        } else if (sensor.getType() == Sensor.TYPE_PROXIMITY) {
            proximity.setText("Prox: "+sensorEvent.values[0]);
        }
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }

    void init() {
        // Initialize Views
        // accelerometer
        xValue = (TextView)findViewById(R.id.x_value);
        yValue = (TextView)findViewById(R.id.y_value);
        zValue = (TextView)findViewById(R.id.z_value);
        // gyroscope
        xGyroValue = (TextView)findViewById(R.id.x_gvalue);
        yGyroValue = (TextView)findViewById(R.id.y_gvalue);
        zGyroValue = (TextView)findViewById(R.id.z_gvalue);
        // magnetometer
        xMag = (TextView)findViewById(R.id.x_mvalue);
        yMag = (TextView)findViewById(R.id.y_mvalue);
        // other sensors
        light = (TextView)findViewById(R.id.light_value);
        pressure = (TextView)findViewById(R.id.pressure_value);
        humidity = (TextView)findViewById(R.id.humidity_value);
        temperature = (TextView)findViewById(R.id.temperature_value);
        proximity = (TextView)findViewById(R.id.proximity_value);
    }
}
